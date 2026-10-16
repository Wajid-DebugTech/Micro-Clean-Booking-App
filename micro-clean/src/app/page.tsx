import Footer from "@/components/Footer";
import FormWizard from "@/components/FormWizard";
import Header from "@/components/Header";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="app">
      <Header />

      <main>
        <section className="intro">
          <div className="eyebrow">
            <Sparkles size={15} aria-hidden="true" /> HOME &amp; OFFICE CLEANING
          </div>
          <h1>Let&apos;s make room for clean.</h1>
          <p>
            Tell us what you need. We&apos;ll confirm your quotation and
            preferred schedule.
          </p>
          <div className="quotation-callout">
            <div>
              <strong>Already have a quotation?</strong>
              <span>
                Review your payment options and send your payment details.
              </span>
            </div>
            <a href="/agree" className="quotation-pay-button">
              Agree & Pay
            </a>
          </div>
        </section>

        <FormWizard />

        <Footer />
      </main>
    </div>
  );
}
