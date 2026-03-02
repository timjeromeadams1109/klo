import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KLO",
  description: "Privacy Policy for the KLO platform by Keith L. Odom.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-display font-bold text-klo-text mb-8">
        Privacy Policy
      </h1>
      <p className="text-klo-muted mb-6">Last updated: March 1, 2026</p>

      <div className="space-y-8 text-klo-text/90 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            1. Information We Collect
          </h2>
          <p>
            When you use KLO, we may collect information you provide directly,
            including your name, email address, and payment information when you
            subscribe. We also collect usage data such as pages visited, features
            used, and device information to improve your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain the KLO platform and its features</li>
            <li>To process subscriptions and payments via Stripe</li>
            <li>To personalize your AI Advisor experience</li>
            <li>To send important account and service updates</li>
            <li>To improve our platform based on usage patterns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            3. Third-Party Services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Supabase</strong> — Authentication and data storage
            </li>
            <li>
              <strong>Stripe</strong> — Payment processing
            </li>
            <li>
              <strong>Vercel</strong> — Hosting and analytics
            </li>
            <li>
              <strong>OpenAI / Anthropic</strong> — AI-powered advisory features
            </li>
            <li>
              <strong>Resend</strong> — Transactional email delivery
            </li>
          </ul>
          <p className="mt-2">
            Each service has its own privacy policy governing the data they
            process on our behalf.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            4. Data Storage and Security
          </h2>
          <p>
            Your data is stored securely using industry-standard encryption. We
            use HTTPS for all data transmission and follow security best
            practices for data at rest. AI conversation data is processed in
            real-time and not stored beyond your active session unless you
            explicitly save it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            5. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Export your data in a portable format</li>
            <li>Opt out of non-essential communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            6. Cookies and Tracking
          </h2>
          <p>
            We use essential cookies for authentication and session management.
            We do not use third-party advertising cookies. Analytics data is
            collected in an anonymized form to improve the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            7. Children&apos;s Privacy
          </h2>
          <p>
            KLO is not intended for users under the age of 13. We do not
            knowingly collect personal information from children under 13. If we
            become aware of such collection, we will delete the information
            promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes via email or an in-app notification. Your
            continued use of KLO after changes constitutes acceptance of the
            updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-klo-text mb-3">
            9. Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy or your data, please
            contact us at{" "}
            <a
              href="mailto:privacy@keithlodom.io"
              className="text-klo-accent hover:underline"
            >
              privacy@keithlodom.io
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
