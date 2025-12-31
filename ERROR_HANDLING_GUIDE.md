# Error Handling Guide

## Overview
The application now uses a design-compliant error dialog system that provides clear, user-friendly error messages.

## Error Types

### 1. **No Data Found** (Info)
- **Icon**: 🔍 Blue info icon
- **When**: Verification fails because no records exist
- **Example**: Bank verification for a mobile number with no linked accounts
- **Message**: Explains that the data doesn't exist and suggests checking input format

### 2. **Feature Coming Soon** (Info)
- **Icon**: 🚧 Blue info icon
- **When**: User tries to access a feature marked as `comingSoon: true`
- **Message**: Informs that the feature is under development

### 3. **Insufficient Credits** (Warning)
- **Icon**: 💳 Yellow warning icon
- **When**: User doesn't have enough credits for verification
- **Message**: Shows required vs available credits and prompts to recharge

### 4. **Session Expired** (Warning)
- **Icon**: 🔒 Yellow warning icon
- **When**: Authentication token expires or is invalid
- **Message**: Notifies session expiration and auto-redirects to login

### 5. **Invalid Input** (Warning)
- **Icon**: ⚠️ Yellow warning icon
- **When**: API rejects input due to format or validation errors
- **Message**: Shows what's wrong with the input

### 6. **Request Timeout** (Warning)
- **Icon**: ⏱️ Yellow warning icon
- **When**: API call takes too long (504 Gateway Timeout)
- **Example**: External verification provider doesn't respond in time
- **Message**: Explains timeout cause and suggests retry after waiting

### 7. **Service Unavailable** (Warning)
- **Icon**: 🚫 Yellow warning icon
- **When**: Backend service returns 503 status
- **Message**: Informs service is temporarily down, try again later

### 8. **Connection Error** (Error)
- **Icon**: 🌐 Red error icon
- **When**: Network failure or server unreachable
- **Message**: Prompts to check internet connection

### 9. **API Error** (Error)
- **Icon**: ❌ Red error icon
- **When**: Server returns 500+ errors or unexpected failures
- **Message**: Generic error message with option to contact support

## Implementation Details

### Frontend (Dashboard.tsx)
```typescript
// Error state management
const [errorDialog, setErrorDialog] = useState<{
  show: boolean;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info';
}>({ show: false, title: '', message: '', type: 'error' });

// Show error dialog
setErrorDialog({
  show: true,
  title: '🔍 No Data Found',
  message: 'Detailed explanation...',
  type: 'info'
});
```

### Backend (apiClient.ts)
- Detects `message_code: "verification_failed"` in API response
- Maps HTTP status codes to meaningful error messages
- Provides structured error data for frontend processing

## User Experience Benefits

1. **Clear Communication**: Users understand exactly what went wrong
2. **Actionable Guidance**: Each error suggests next steps
3. **Visual Hierarchy**: Color-coded icons help users quickly assess severity
4. **No More Generic Alerts**: Replaced browser `alert()` popups with styled dialogs
5. **Consistent Design**: Uses shadcn/ui AlertDialog component matching app theme

## Error Flow

```
API Call → Error Occurs → apiClient detects error type → 
Dashboard receives error → setErrorDialog with appropriate type → 
AlertDialog displays with icon, title, and detailed message
```

## Testing Error Scenarios

1. **No Data**: Use mobile number `7306151617` for bank verification
2. **Coming Soon**: Click on Voter ID verification
3. **Low Credits**: Set credits to 0 in test
4. **Invalid Input**: Submit empty or malformed data
5. **Network Error**: Disconnect internet and try verification
6. **Timeout Error**: Use slow/unresponsive endpoints (504 status)
7. **Service Down**: Test when backend returns 503 status

## Common Timeout Issues (504)

### What Causes Timeouts?
- External verification APIs taking too long (15-30+ seconds)
- High traffic on third-party data providers
- Network latency between backend and external services
- Backend timeout limits (Vercel has 10-15s limits on free tier)

### Solutions for Users:
1. **Wait and Retry**: Most timeouts are temporary
2. **Off-Peak Hours**: Try during less busy times
3. **Different Verification**: Use alternative verification methods
4. **Contact Support**: If persistent, may indicate backend issues

### Solutions for Developers:
1. Increase backend timeout limits (if hosting allows)
2. Implement request queuing for slow APIs
3. Add caching for frequently requested data
4. Use async processing for slow verifications
5. Monitor external API performance
