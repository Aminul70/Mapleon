# ⚠️ Temporary Mock OAuth Implementation

## Overview
This document describes the temporary mock social login implementation for Google and Facebook login buttons. This is for **DEMO PURPOSES ONLY** and should be replaced with real OAuth integration.

## What's Implemented

### Mock Social Login Functionality
- **Location:** `/app/src/pages/Login.tsx`
- **Function:** `handleSocialLogin(provider: string)`
- **Lines:** ~187-203

### How It Works
1. When a user clicks "Continue with Google" or "Continue with Facebook"
2. A mock user account is automatically created with:
   - Random name (e.g., "Google User 742")
   - Temporary email (e.g., "googleuser1733026347@temp.demo")
   - Account type based on selected account type (personal/business)
3. User is logged in automatically
4. Navigation happens based on account type:
   - Personal accounts → `/interests` page
   - Business accounts → `/business-onboarding` page

### Features
- ✅ Works on Login screen
- ✅ Works on Personal Registration screen
- ✅ Works on Business Registration screen
- ✅ Creates unique mock users each time
- ✅ Properly navigates based on account type

## How to Remove (When Real OAuth is Ready)

### Step 1: Remove the Mock Function
In `/app/src/pages/Login.tsx`, find and **DELETE** these lines:

```typescript
// ⚠️ TEMPORARY MOCK SOCIAL LOGIN - REMOVE WHEN OAUTH IS INTEGRATED ⚠️
const handleSocialLogin = (provider: string) => {
  // Generate a random mock user based on provider and account type
  const timestamp = Date.now();
  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
  
  const mockUserData = {
    name: `${providerName} User ${Math.floor(Math.random() * 1000)}`,
    email: `${provider}user${timestamp}@temp.demo`,
    password: 'temp123', // Not actually used for social login
    accountType: accountType || 'personal' as 'personal' | 'business',
  };

  // Register the mock user
  const success = register(mockUserData);
  
  if (success) {
    // Navigate based on account type
    if (mockUserData.accountType === 'business') {
      navigate('/business-onboarding');
    } else {
      navigate('/interests');
    }
  }
};
// ⚠️ END OF TEMPORARY MOCK CODE ⚠️
```

### Step 2: Implement Real OAuth
Replace the deleted function with your real OAuth implementation:

```typescript
const handleSocialLogin = async (provider: string) => {
  try {
    // Your real OAuth implementation here
    // Example with Firebase:
    // const result = await signInWithPopup(auth, provider === 'google' ? googleProvider : facebookProvider);
    // const user = result.user;
    
    // Or with your backend API:
    // const response = await fetch(`/api/auth/${provider}`);
    // const data = await response.json();
    
    // Handle successful login
    // navigate to appropriate page based on user type
  } catch (error) {
    console.error(`${provider} login error:`, error);
    // Handle error
  }
};
```

### Step 3: Test Real OAuth
1. Test Google OAuth flow
2. Test Facebook OAuth flow
3. Verify proper navigation for both personal and business accounts
4. Verify user data is properly stored

## Files Modified
- `/app/src/pages/Login.tsx` - Added mock `handleSocialLogin` function

## Testing Checklist
Before removing mock code, ensure:
- [ ] Real OAuth providers are configured
- [ ] Google OAuth credentials are set up
- [ ] Facebook OAuth credentials are set up
- [ ] OAuth callbacks are handled properly
- [ ] User data is properly saved to database
- [ ] Navigation works correctly based on account type
- [ ] Error handling is in place

## Notes
- The mock implementation uses the existing `register()` function from AuthContext
- Mock users are stored in localStorage (same as regular registrations)
- Each click creates a new unique user
- No actual OAuth flow or external API calls are made

---

**Created:** December 2024  
**Status:** Temporary Demo Implementation  
**Action Required:** Replace with real OAuth when ready
