import { useState } from 'react';
import { ArrowLeftIcon, SearchIcon, ChevronRightIcon, MessageCircleIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function Help() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I book a table at a restaurant?',
      answer: 'Navigate to the business detail page and tap the "Book a Table" button. Select your preferred date, time, and party size, then confirm your booking.',
      category: 'Bookings'
    },
    {
      question: 'How do I save my favorite places?',
      answer: 'Tap the heart icon on any business card or detail page to save it to your favorites. Access your saved places from the profile menu.',
      category: 'Account'
    },
    {
      question: 'Can I share my profile with friends?',
      answer: 'Yes! Go to your profile page and tap "Share Profile" to send your MapLeon profile link via social media or messaging apps.',
      category: 'Account'
    },
    {
      question: 'How does the map feature work?',
      answer: 'The map shows all nearby businesses based on your location. You can filter by category, search for specific places, and tap on markers to see details.',
      category: 'Features'
    },
    {
      question: 'How do I turn off notifications?',
      answer: 'Go to Settings > Push Notifications and toggle it off. You can also manage notification preferences from your device settings.',
      category: 'Settings'
    },
    {
      question: 'How do I change my interests?',
      answer: 'Go to your Profile > Edit Profile to update your interests and preferences. This helps personalize your feed.',
      category: 'Account'
    },
    {
      question: 'What does "Near Me" do?',
      answer: 'The "Near Me" button on the map centers the view on your current location and shows businesses closest to you.',
      category: 'Features'
    },
    {
      question: 'How do I contact a business?',
      answer: 'On the business detail page, you can use the "Call Now" button to contact them directly, or send them a message through the Messages feature.',
      category: 'Communication'
    },
    {
      question: 'Can I post reviews?',
      answer: 'Yes! Visit a business detail page and go to the Reviews tab to write your review and rate your experience.',
      category: 'Features'
    },
    {
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Privacy & Security > Delete Account. Please note this action is permanent and cannot be undone.',
      category: 'Account'
    }
  ];

  const filteredFAQs = searchQuery.trim()
    ? faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  return (
    <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-mapleon-teal to-mapleon-aqua px-4 sm:px-6 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 -ml-2 text-white active:scale-95 transition-transform"
          >
            <ArrowLeftIcon size={22} />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Help Center
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30 transition-all"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg font-bold text-mapleon-slate mb-3">
          Quick Actions
        </h2>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <MessageCircleIcon size={20} className="text-blue-600" />
              </div>
              <span className="font-medium text-mapleon-slate">Live Chat Support</span>
            </div>
            <ChevronRightIcon size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <MailIcon size={20} className="text-green-600" />
              </div>
              <span className="font-medium text-mapleon-slate">Email Support</span>
            </div>
            <ChevronRightIcon size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                <PhoneIcon size={20} className="text-purple-600" />
              </div>
              <span className="font-medium text-mapleon-slate">Call Us</span>
            </div>
            <ChevronRightIcon size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg font-bold text-mapleon-slate mb-3">
          Frequently Asked Questions
        </h2>

        {filteredFAQs.length > 0 ? (
          <div className="space-y-2">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.question ? null : faq.question)}
                  className="w-full flex items-start justify-between p-4 text-left active:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-mapleon-coral px-2 py-1 bg-mapleon-coral/10 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <p className="font-semibold text-mapleon-slate">
                      {faq.question}
                    </p>
                  </div>
                  <ChevronRightIcon
                    size={20}
                    className={`text-gray-400 flex-shrink-0 ml-2 transition-transform ${
                      expandedFAQ === faq.question ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {expandedFAQ === faq.question && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-500">
              No FAQs found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="px-4 sm:px-6 py-4">
        <div className="bg-gradient-to-br from-mapleon-teal to-mapleon-aqua rounded-3xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">
            Still need help?
          </h3>
          <p className="text-white/90 mb-4 text-sm">
            Our support team is available 24/7 to assist you
          </p>
          <button className="w-full bg-white text-mapleon-teal font-semibold py-3 rounded-2xl active:scale-95 transition-transform">
            Contact Support
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
