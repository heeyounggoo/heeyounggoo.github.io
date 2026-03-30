import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goo Hee Young | Frontend Developer",
  description: "프론트엔드 개발자 구희영의 포트폴리오",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: '"Pretendard Variable", Pretendard, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
