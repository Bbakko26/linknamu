import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "링크나무",
  description: "내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하세요",
};

// 첫 페인트 전에 테마를 적용해 깜빡임 방지
const themeScript = `
(function(){try{
  var t=localStorage.getItem('theme');
  var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(d)document.documentElement.classList.add('dark');
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
