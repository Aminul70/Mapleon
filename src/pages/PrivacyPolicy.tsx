import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-mapleon-teal to-mapleon-aqua px-4 sm:px-6 pt-4 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 -ml-2 text-white active:scale-95 transition-transform"
          >
            <ArrowLeftIcon size={22} />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-6">
            Last updated: November 29, 2024
          </p>

          <div className="space-y-6 text-mapleon-slate">
            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                1. Information We Collect
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                We collect information you provide directly to us, such as when you create an account, update your profile, interact with businesses, or contact us for support. This includes your name, email address, profile photo, location data, and preferences.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience and recommendations</li>
                <li>Send you updates, notifications, and promotional content</li>
                <li>Process bookings and reservations</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and optimize our platform</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                3. Location Information
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                With your permission, we collect and process location data to show you nearby businesses, provide directions, and personalize your experience. You can disable location services at any time through your device settings.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                4. Information Sharing
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 mb-2">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                <li>With businesses when you make bookings or reservations</li>
                <li>With service providers who assist in operating our platform</li>
                <li>When required by law or to protect rights and safety</li>
                <li>With your consent or at your direction</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                5. Data Security
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                6. Your Rights and Choices
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of promotional communications</li>
                <li>Disable location services</li>
                <li>Request a copy of your data</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                7. Cookies and Tracking
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                We use cookies and similar tracking technologies to collect usage information and improve our services. You can control cookie preferences through your browser settings.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                8. Children's Privacy
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                MapLeon is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                9. Changes to This Policy
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                10. Contact Us
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 text-sm text-gray-700">
                <p>Email: privacy@mapleon.com</p>
                <p>Address: 123 Privacy St, San Francisco, CA 94102</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
