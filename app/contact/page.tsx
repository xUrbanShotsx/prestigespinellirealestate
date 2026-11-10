import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Get in touch</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Talk to our<br />prestige team.
          </Reveal>
        </div>
      </section>
      <section className="section light">
        <div className="wrap">
          <div className="contact">
            <div className="contact__info">
              <Reveal><p className="eyebrow">Address</p><p>16 College Avenue<br />Shellharbour City Centre<br />NSW 2529</p></Reveal>
              <Reveal delay={60}><p className="eyebrow">Phone</p><p><a href="tel:0242960047">02 4296 0047</a></p></Reveal>
              <Reveal delay={120}><p className="eyebrow">Email</p><p><a href="mailto:prestige@spinellire.com">prestige@spinellire.com</a></p></Reveal>
              <Reveal delay={180}><p className="eyebrow">Hours</p><p>Mon – Fri · 8:30am – 5:30pm<br />Saturday · 9:00am – 4:00pm</p></Reveal>
            </div>
            <Reveal delay={80}><ContactForm /></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
