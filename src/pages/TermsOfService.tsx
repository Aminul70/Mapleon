import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

export function TermsOfService() {
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
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                By accessing or using MapLeon, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                2. User Accounts
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 mb-2">
                When you create an account with us, you agree to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                3. User Content
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                You retain ownership of content you post on MapLeon (reviews, photos, comments). By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content on our platform.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                4. Prohibited Activities
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 mb-2">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                <li>Post false, misleading, or fraudulent content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any laws or regulations</li>
                <li>Attempt to hack or compromise the platform</li>
                <li>Spam or send unsolicited messages</li>
                <li>Impersonate others or misrepresent your affiliation</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                5. Bookings and Reservations
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                MapLeon facilitates bookings between users and businesses. We are not responsible for the services provided by businesses. All bookings are subject to business availability and their cancellation policies.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                6. Intellectual Property
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                The MapLeon platform, including its original content, features, and functionality, is owned by MapLeon and protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                7. Disclaimer of Warranties
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                MapLeon is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free. We are not responsible for the accuracy of business information or user-generated content.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                8. Limitation of Liability
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                MapLeon shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, including any interactions with businesses or other users.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                9. Termination
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                We reserve the right to terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                10. Modifications to Service
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                We reserve the right to modify or discontinue the service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                11. Governing Law
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                12. Changes to Terms
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                We may update these Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                13. Contact Information
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3 text-sm text-gray-700">
                <p>Email: legal@mapleon.com</p>
                <p>Address: 123 Legal St, San Francisco, CA 94102</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
