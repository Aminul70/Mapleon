import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { BusinessCard } from '../components/BusinessCard';
import { ArrowLeft, Heart, Share2, Bookmark, Settings } from 'lucide-react';
import { mockBusinesses } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

export function DesignSystem() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="icon" size="sm" onClick={() => navigate('/home')}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-neutral-900">Design System</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Colors */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-primary-brand rounded-lg"></div>
              <p className="text-sm font-medium">Primary Brand</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-secondary-teal rounded-lg"></div>
              <p className="text-sm font-medium">Secondary Teal</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-business-badge rounded-lg"></div>
              <p className="text-sm font-medium">Business Badge</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-neutral-900 rounded-lg"></div>
              <p className="text-sm font-medium">Neutral 900</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Typography</h2>
          <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-200">
            <h1 className="text-2xl font-bold">Heading 1 - Bold 24px</h1>
            <h2 className="text-xl font-semibold">Heading 2 - Semibold 20px</h2>
            <h3 className="text-lg font-semibold">Heading 3 - Semibold 18px</h3>
            <h4 className="text-base font-semibold">Heading 4 - Semibold 16px</h4>
            <p className="text-base">Body Large - Regular 16px</p>
            <p className="text-sm">Body Small - Regular 14px</p>
            <p className="text-xs font-medium">Label - Medium 12px</p>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Buttons</h2>
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-neutral-200">
            {/* Primary Buttons */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">Primary</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" size="md" icon={<Heart size={16} />}>With Icon</Button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">Secondary</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
                <Button variant="secondary" size="md" icon={<Share2 size={16} />}>With Icon</Button>
              </div>
            </div>

            {/* Ghost Buttons */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">Ghost</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" size="sm">Small</Button>
                <Button variant="ghost" size="md">Medium</Button>
                <Button variant="ghost" size="lg">Large</Button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">Icon Only</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="icon" size="sm"><Heart size={16} /></Button>
                <Button variant="icon" size="md"><Bookmark size={18} /></Button>
                <Button variant="icon" size="lg"><Settings size={20} /></Button>
              </div>
            </div>

            {/* States */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">States</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md">Normal</Button>
                <Button variant="primary" size="md" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Avatars</h2>
          <div className="bg-white p-6 rounded-2xl border border-neutral-200">
            <div className="flex flex-wrap items-end gap-6">
              <div className="text-center">
                <Avatar size="xs" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
                <p className="text-xs mt-2">XS (32px)</p>
              </div>
              <div className="text-center">
                <Avatar size="sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" online />
                <p className="text-xs mt-2">SM (40px)</p>
              </div>
              <div className="text-center">
                <Avatar size="md" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" />
                <p className="text-xs mt-2">MD (56px)</p>
              </div>
              <div className="text-center">
                <Avatar size="lg" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" online />
                <p className="text-xs mt-2">LG (80px)</p>
              </div>
              <div className="text-center">
                <Avatar size="xl" initials="JD" />
                <p className="text-xs mt-2">XL (120px)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Badges</h2>
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-neutral-200">
            {/* Business Badge */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">Business Badge</p>
              <div className="flex flex-wrap gap-2">
                <Badge type="business" icon="crown" size="sm">Business</Badge>
                <Badge type="business" icon="crown" size="md">Business</Badge>
                <Badge type="business" icon="star" size="lg">Verified Business</Badge>
              </div>
            </div>

            {/* Category Badges */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">Categories</p>
              <div className="flex flex-wrap gap-2">
                <Badge type="category" size="sm">Restaurant</Badge>
                <Badge type="category" size="md">Cafe</Badge>
                <Badge type="category" size="md">Gym</Badge>
                <Badge type="category" size="md">Salon</Badge>
              </div>
            </div>

            {/* Status Badges */}
            <div>
              <p className="text-sm font-medium text-neutral-600 mb-3">Status</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" size="md">Open Now</Badge>
                <Badge variant="error" size="md">Closed</Badge>
                <Badge variant="warning" size="md">Closing Soon</Badge>
                <Badge variant="info" size="md">New</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Inputs</h2>
          <div className="space-y-4 bg-white p-6 rounded-2xl border border-neutral-200">
            <Input
              placeholder="Enter text..."
              value={inputValue}
              onChange={setInputValue}
              fullWidth
            />
            <Input
              type="search"
              icon="search"
              placeholder="Search businesses..."
              value={searchValue}
              onChange={setSearchValue}
              clearable
              fullWidth
            />
            <Input
              placeholder="Disabled input"
              disabled
              fullWidth
            />
            <Input
              placeholder="Input with error"
              error="This field is required"
              fullWidth
            />
          </div>
        </section>

        {/* Business Cards */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Business Cards</h2>
          <div className="space-y-4">
            <BusinessCard
              business={mockBusinesses[0]}
              onViewDetails={() => alert('View Details clicked')}
            />
            <BusinessCard
              business={mockBusinesses[1]}
              variant="compact"
              showActions={false}
            />
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Spacing Scale</h2>
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-3">
            {[1, 2, 3, 4, 6, 8, 12, 16].map((space) => (
              <div key={space} className="flex items-center gap-4">
                <div className={`bg-primary-brand h-8`} style={{ width: `${space * 4}px` }}></div>
                <span className="text-sm font-mono">space-{space} ({space * 4}px)</span>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Shadows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {['sm', 'md', 'lg', 'xl', '2xl'].map((shadow) => (
              <div key={shadow} className="text-center">
                <div className={`bg-white p-6 rounded-xl shadow-${shadow} mb-2`}>
                  <div className="w-12 h-12 bg-primary-brand rounded-lg mx-auto"></div>
                </div>
                <p className="text-sm font-mono">shadow-{shadow}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Border Radius</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: 'sm', value: '6px' },
              { name: 'md', value: '12px' },
              { name: 'lg', value: '16px' },
              { name: 'xl', value: '24px' },
            ].map((radius) => (
              <div key={radius.name} className="text-center">
                <div className={`bg-primary-brand p-6 rounded-${radius.name} mb-2 h-24`}></div>
                <p className="text-sm font-mono">rounded-{radius.name}</p>
                <p className="text-xs text-neutral-500">{radius.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
