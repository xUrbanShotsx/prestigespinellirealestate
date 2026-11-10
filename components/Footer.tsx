import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer dark">
      <div className="wrap footer__grid">
        <div>
          <p className="eyebrow">Studio</p>
          <p>
            16 College Avenue<br />
            Shellharbour City Centre<br />
            NSW 2529, Australia
          </p>
        </div>
        <div>
          <p className="eyebrow">Enquiries</p>
          <p>
            <a href="mailto:prestige@spinellire.com">prestige@spinellire.com</a>
            <br />
            <a href="tel:+61242960047">02 4296 0047</a>
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <p>
            <Link href="/">Listings</Link>
            <br />
            <Link href="/about">About</Link>
            <br />
            <Link href="/contact">Contact</Link>
            <br />
            <a href="https://www.spinellirealestate.com.au" target="_blank" rel="noopener noreferrer">
              Spinelli Real Estate ↗
            </a>
          </p>
        </div>
      </div>
      <div className="wrap">
        <Image
          src="/logo.webp"
          alt="Spinelli Prestige"
          width={240}
          height={60}
          className="footer__mark"
          style={{ maxWidth: "280px", height: "auto", opacity: 0.6 }}
        />
        <p className="footer__legal">
          <span>© 2025 Spinelli Prestige. All rights reserved.</span>
          <span>Licensed Real Estate Agent NSW.</span>
        </p>
      </div>
    </footer>
  );
}
