import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Gabriel Pitol | Desenvolvedor Full-Stack & Cybersecurity",
  description:
    "Portfólio de João Gabriel Pitol — Desenvolvedor Full-Stack com experiência em React, Laravel, Python e Java. Especialização em Cybersecurity. Graduado em Ciência da Computação pela PUCPR.",
  keywords: [
    "desenvolvedor",
    "full-stack",
    "cybersecurity",
    "react",
    "next.js",
    "portfolio",
    "joão gabriel pitol",
  ],
  authors: [{ name: "João Gabriel Pitol" }],
  openGraph: {
    title: "João Gabriel Pitol | Desenvolvedor Full-Stack & Cybersecurity",
    description:
      "Portfólio pessoal premium — desenvolvimento web, cybersecurity e inovação.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
