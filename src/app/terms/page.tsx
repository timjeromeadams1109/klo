import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | KLO",
  description: "Terms of Service for the KLO platform by Keith L. Odom.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-display font-bold text-klo-text mb-8">
        Terms of Service
      </h1>
      <p className="text-klo-muted mb-6">Last updated: March 1, 2026</p>

      <div className="space-y-8 text-klo-text/90 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using KLO (&quot;the Platform&quot;), operated by Keith L.
            Odom, you agree to be bound by these Terms of Service. If you do not
            agree to these terms, please do not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            2. Description of Service
          </h2>
          <p>
            KLO provides AI-powered advisory services, leadership assessments,
            an exclusive content vault, strategy rooms, marketplace, and booking
            functionality. Some features require a paid subscription.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            3. User Accounts
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You must provide accurate and complete information when creating an
              account
            </li>
            <li>
              You are responsible for maintaining the security of your account
              credentials
            </li>
            <li>
              You must be at least 13 years of age to create an account
            </li>
            <li>
              One person or entity may not maintain more than one account
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            4. Subscriptions and Payments
          </h2>
          <p>
            Paid subscriptions are billed through Stripe on a recurring basis.
            You may cancel your subscription at any time through your profile
            settings. Refunds are handled on a case-by-case basis. Prices may
            change with 30 days&apos; prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            5. AI Advisor Disclaimer
          </h2>
          <p>
            The AI Advisor feature provides general guidance and insights based
            on Keith L. Odom&apos;s teachings and expertise. It is not a substitute
            for professional legal, financial, medical, or therapeutic advice.
            You use AI-generated content at your own discretion and risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            6. Intellectual Property
          </h2>
          <p>
            All content on the Platform, including text, graphics, logos, audio,
            video, and software, is the property of Keith L. Odom or its
            licensors and is protected by intellectual property laws. You may not
            reproduce, distribute, or create derivative works without explicit
            written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            7. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Use the Platform for any unlawful purpose</li>
            <li>
              Attempt to gain unauthorized access to any part of the Platform
            </li>
            <li>
              Interfere with or disrupt the Platform&apos;s infrastructure
            </li>
            <li>Share your account credentials with others</li>
            <li>
              Scrape, crawl, or use automated means to access the Platform
              without permission
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            8. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, KLO and Keith L. Odom shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages resulting from your use of the Platform. Our
            total liability shall not exceed the amount you paid in subscription
            fees during the twelve months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            9. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            Platform at any time for violation of these Terms. Upon termination,
            your right to use the Platform ceases immediately. You may request
            export of your data within 30 days of termination.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            10. Changes to Terms
          </h2>
          <p>
            We may modify these Terms at any time. Material changes will be
            communicated via email or in-app notification at least 14 days
            before taking effect. Continued use of the Platform after changes
            constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            11. Governing Law
          </h2>
          <p>
            These Terms are governed by the laws of the United States. Any
            disputes shall be resolved through binding arbitration in accordance
            with applicable rules.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            12. Contact
          </h2>
          <p>
            For questions about these Terms, contact us at{" "}
            <a
              href="mailto:legal@keithlodom.io"
              className="text-klo-accent hover:underline"
            >
              legal@keithlodom.io
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
