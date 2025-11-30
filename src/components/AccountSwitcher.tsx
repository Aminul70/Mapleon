import React, { useEffect } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavBar } from '../contexts/NavBarContext';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

interface AccountSwitcherProps {
  onClose: () => void;
}

export function AccountSwitcher({ onClose }: AccountSwitcherProps) {
  const { currentUser, allAccounts, switchAccount } = useAuth();
  const { hideNavBar, showNavBar } = useNavBar();

  // Hide navbar when modal opens
  useEffect(() => {
    hideNavBar();
    return () => {
      showNavBar();
    };
  }, [hideNavBar, showNavBar]);

  const handleSwitch = (userId: string) => {
    switchAccount(userId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full bg-white rounded-t-3xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-neutral-900">Switch Account</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Accounts List */}
        <div className="max-h-96 overflow-y-auto">
          {allAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSwitch(account.id)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <Avatar
                src={account.profileImage}
                alt={account.name}
                size="md"
              />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-neutral-900">{account.name}</p>
                  {account.accountType === 'business' && (
                    <Badge type="business" size="sm" icon="crown">
                      Business
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-600">@{account.username}</p>
              </div>
              {currentUser?.id === account.id && (
                <div className="w-6 h-6 bg-primary-brand rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </button>
          ))}

          {/* Add Account Button */}
          <button
            onClick={() => {
              onClose();
              // Navigate to login page to add account
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-t border-gray-200"
          >
            <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-neutral-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-neutral-900">Add Account</p>
              <p className="text-sm text-neutral-600">Log in to another account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
