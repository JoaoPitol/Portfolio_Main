'use client';

import {
  forwardRef,
  useRef,
  useEffect,
  MutableRefObject,
  CSSProperties,
  HTMLAttributes,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  /**
   * 'char' (default) — each character gets its own animated span.
   * 'word' — each word gets its own animated span (much fewer DOM nodes;
   *           ideal for long paragraphs where char-level would be expensive).
   */
  splitBy?: 'char' | 'word';
  /**
   * When true, each token animates in on mount (opacity 0→1, slide from right).
   * Uses CSS transitions on opacity/transform only — does NOT conflict with the
   * RAF loop that handles fontVariationSettings.
   */
  animateEntry?: boolean;
  /** Base delay (seconds) before the first token appears. Default: 0 */
  entryBaseDelay?: number;
  /** Extra delay (seconds) added per token index. Default: 0.055 */
  entryStagger?: number;
  className?: string;
  style?: CSSProperties;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseFVS(fvs: string): Record<string, number> {
  const result: Record<string, number> = {};
  const re = /'([^']+)'\s+([\d.+-]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(fvs)) !== null) result[m[1]] = parseFloat(m[2]);
  return result;
}

function computeStrength(distance: number, radius: number, falloff: string): number {
  if (distance >= radius) return 0;
  const t = 1 - distance / radius;
  if (falloff === 'linear') return t;
  if (falloff === 'exponential') return t * t;
  // gaussian — smoothest
  const sigma = radius / 2;
  return Math.exp(-(distance * distance) / (2 * sigma * sigma));
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * VariableProximity — animates each letter's font-variation-settings
 * based on cursor proximity.
 *
 * Performance guarantees:
 *   • letter positions are cached; only re-measured via ResizeObserver
 *   • RAF reads from cache only (zero getBoundingClientRect calls per frame)
 *   • AABB fast-reject skips letters outside radius before computing sqrt
 *   • entry animation uses CSS transitions on opacity/transform — no RAF conflict
 */
const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 150,
      falloff = 'gaussian',
      splitBy = 'char',
      animateEntry = false,
      entryBaseDelay = 0,
      entryStagger = 0.055,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // ── Parsed axis maps ─────────────────────────────────────────────────────
    const fromMap = useRef(parseFVS(fromFontVariationSettings));
    const toMap = useRef(parseFVS(toFontVariationSettings));
    const axes = useRef(Object.keys({ ...fromMap.current, ...toMap.current }));
    const restFVS = useRef(fromFontVariationSettings);

    useEffect(() => {
      fromMap.current = parseFVS(fromFontVariationSettings);
      toMap.current = parseFVS(toFontVariationSettings);
      axes.current = Object.keys({ ...fromMap.current, ...toMap.current });
      restFVS.current = fromFontVariationSettings;
      cacheValid.current = false;
    }, [fromFontVariationSettings, toFontVariationSettings]);

    // ── Position cache ───────────────────────────────────────────────────────
    const posCache = useRef<{ cx: number; cy: number }[]>([]);
    const cacheValid = useRef(false);

    const buildCache = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      posCache.current = letterRefs.current.map((el) => {
        if (!el) return { cx: 0, cy: 0 };
        const r = el.getBoundingClientRect();
        return { cx: r.left + r.width / 2 - cRect.left, cy: r.top + r.height / 2 - cRect.top };
      });
      cacheValid.current = true;
    };

    // ── Mouse position ref ───────────────────────────────────────────────────
    const mouse = useRef({ x: -9999, y: -9999 });

    // ── Entry animation (runs once on mount) ─────────────────────────────────
    // Uses CSS transitions ONLY on opacity + transform.
    // fontVariationSettings has no CSS transition so RAF won't fight it.
    useEffect(() => {
      if (!animateEntry) return;

      const timers: ReturnType<typeof setTimeout>[] = [];

      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        // Start hidden & shifted
        el.style.opacity = '0';
        el.style.transform = 'translateX(10px)';
        // Only transition opacity and transform — NOT fontVariationSettings
        el.style.transition =
          'opacity 0.45s ease-out, transform 0.45s cubic-bezier(0.68,-0.55,0.27,1.55)';

        const delay = (entryBaseDelay + i * entryStagger) * 1000;
        timers.push(
          setTimeout(() => {
            if (!el) return;
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, delay),
        );
      });

      return () => timers.forEach(clearTimeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animateEntry, entryBaseDelay, entryStagger]);

    // ── RAF + event listeners ────────────────────────────────────────────────
    useEffect(() => {
      const onMouse = (e: MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;
        const cRect = container.getBoundingClientRect();
        mouse.current = { x: e.clientX - cRect.left, y: e.clientY - cRect.top };
      };
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        const container = containerRef.current;
        if (!container) return;
        const cRect = container.getBoundingClientRect();
        mouse.current = { x: t.clientX - cRect.left, y: t.clientY - cRect.top };
      };

      const ro = new ResizeObserver(() => { cacheValid.current = false; });
      if (containerRef.current) ro.observe(containerRef.current);

      window.addEventListener('mousemove', onMouse);
      window.addEventListener('touchmove', onTouch, { passive: true });

      let frameId: number;

      const loop = () => {
        frameId = requestAnimationFrame(loop);

        if (!cacheValid.current) buildCache();
        if (!cacheValid.current) return;

        const { x: mx, y: my } = mouse.current;
        const cache = posCache.current;
        const from = fromMap.current;
        const to = toMap.current;
        const axList = axes.current;

        for (let i = 0; i < letterRefs.current.length; i++) {
          const el = letterRefs.current[i];
          if (!el) continue;

          const { cx, cy } = cache[i] ?? { cx: 0, cy: 0 };
          const dx = mx - cx;
          const dy = my - cy;

          // AABB fast-reject
          if (Math.abs(dx) > radius && Math.abs(dy) > radius) {
            if (el.style.fontVariationSettings !== restFVS.current) {
              el.style.fontVariationSettings = restFVS.current;
            }
            continue;
          }

          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = computeStrength(dist, radius, falloff);

          if (t === 0) {
            if (el.style.fontVariationSettings !== restFVS.current) {
              el.style.fontVariationSettings = restFVS.current;
            }
            continue;
          }

          let fvs = '';
          for (let a = 0; a < axList.length; a++) {
            const axis = axList[a];
            const fv = from[axis] ?? 0;
            const tv = to[axis] ?? fv;
            if (a > 0) fvs += ', ';
            fvs += `'${axis}' ${(fv + (tv - fv) * t).toFixed(1)}`;
          }
          el.style.fontVariationSettings = fvs;
        }
      };

      frameId = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('touchmove', onTouch);
        ro.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, radius, falloff]);

    // Build the list of tokens: either individual chars or whole words
    const tokens: string[] = splitBy === 'word' ? label.split(' ') : label.split('');

    return (
      <span ref={ref} className={className} style={style} {...rest}>
        {tokens.map((token, i) => (
          <span key={i} style={{ display: 'inline' }}>
            <span
              ref={(el) => { letterRefs.current[i] = el; }}
              style={{
                display: 'inline-block',
                whiteSpace: splitBy === 'word' ? 'normal' : 'pre',
                fontVariationSettings: fromFontVariationSettings,
                ...(animateEntry ? { opacity: 0 } : {}),
              }}
            >
              {token}
            </span>
            {/* Re-insert the space that split() consumed, except after the last token */}
            {splitBy === 'word' && i < tokens.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    );
  },
);

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
