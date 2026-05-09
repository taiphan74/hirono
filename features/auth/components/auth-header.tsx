import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Blogs", href: "#blogs" },
  { label: "About us", href: "#about-us" },
  { label: "Contact", href: "#contact" },
]

export function AuthHeader(): React.JSX.Element {
  return (
    <header className="flex w-full items-center border-b border-[#D5D8DD] bg-white">
      <div className="flex w-full max-w-[1440px] mx-auto items-center gap-5 px-6 py-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/auth-logo.svg"
            alt="Kojo"
            width={76}
            height={24}
            priority
          />
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-center rounded-2xl px-2 py-2 text-base leading-none text-[#111316] hover:bg-[#F5F5F5] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}