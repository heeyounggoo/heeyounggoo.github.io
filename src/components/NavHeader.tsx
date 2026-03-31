import Link from "next/link";

interface NavHeaderProps {
  fixed?: boolean;
}

export function NavHeader({ fixed = false }: NavHeaderProps) {
  const positionClass = fixed
    ? "fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-sm"
    : "";

  return (
    <header
      className={`flex items-center justify-between px-8 py-6 ${positionClass}`}
    >
      <Link
        href="/"
        className="text-sm font-bold tracking-wide transition-opacity hover:opacity-50"
      >
        920
      </Link>
      <nav className="flex gap-10 text-sm font-bold">
        <Link href="/about" className="transition-opacity hover:opacity-50">
          about
        </Link>
        <Link href="/career" className="transition-opacity hover:opacity-50">
          career
        </Link>
        <Link href="/blog" className="transition-opacity hover:opacity-50">
          blog
        </Link>
      </nav>
      <span />
    </header>
  );
}
