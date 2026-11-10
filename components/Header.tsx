"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="header">
        <Link href="/" className="header__logo" aria-label="Spinelli Prestige home">
          <Image
            src="/logo.webp"
            alt="Spinelli Prestige"
            width={360}
            height={90}
            priority
            style={{ height: "clamp(52px,5.5vw,80px)", width: "auto" }}
          />
        </Link>
        <nav className="header__nav" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                l.href === "/"
                  ? pathname === "/"
                    ? "is-active"
                    : ""
                  : pathname.startsWith(l.href)
                  ? "is-active"
                  : ""
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="header__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <div className={`menu ${open ? "menu--open" : ""}`} aria-hidden={!open}>
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
