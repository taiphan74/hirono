import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
]

export function AuthHeader(): React.JSX.Element {
  return (
    <header className="flex w-full max-w-[1440px] mx-auto items-center border-b border-[#D5D8DD] bg-white px-6 py-5">
      <div className="flex items-center gap-[232px]">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-1 px-1.5">
            <Image
              src="/kojo-logo.svg"
              alt="Kojo"
              width={21}
              height={25}
              priority
            />
            <span className="text-[22.4px] font-medium leading-[129%] text-[#000000]"
              style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
            >
              Kojo
            </span>
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
      </div>
    </header>
  )
}