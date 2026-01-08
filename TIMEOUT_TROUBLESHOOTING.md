# Request Timeout Troubleshooting Guide

## 🔍 Problem Overview

The "Request Timeout" error occurs when calling the **Aadhar Family Tree** verification service (and potentially other services).

### Error Message:
```
⏱️ Request Timeout

The verification service took too long to respond and timed out.

This usually happens when:
• The external data provider is slow or overloaded
• Network latency is high  
• The service is experiencing high traffic
```

---

## 🎯 Root Causes

### 1. **External API Dependency**
- Your frontend calls `https://osint-ninja.vercel.app/api/aadhaar/family-members`
- This external API may be:
  - ⏳ Slow (takes >10-25 seconds to respond)
  - 🚫 Rate-limited or overloaded
  - 📉 Experiencing downtime
  - 🌍 Geographically far from your users

### 2. **Netlify Serverless Function Limits**
- **Free tier**: 10-second timeout
- **Pro tier**: 26-second timeout
- If the external API takes longer, Netlify kills the request with a 504 Gateway Timeout

### 3. **Network Latency**
- Users with slow internet connections
- Poor connectivity between services
- DNS resolution delays

---

## ✅ Solutions Implemented

### 1. **Frontend Timeout Configuration** ⏱️
**File**: `client/lib/apiClient.ts`

Added explicit timeout control with AbortController:
```typescript
// 25-second timeout with better error handling
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 25000);

const response = await fetch(url, {
  signal: controller.signal,
  // ... other options
});
```

**Benefits:**
- Prevents indefinite hangs
- Clear timeout error messages
- Faster failure feedback to users

---

### 2. **Automatic Retry Logic** 🔄
**File**: `client/lib/apiClient.ts`

Added smart retry mechanism for the Aadhar Family Members API:
```typescript
export const verifyAadhaarFamilyMembers = async (
  aadhaarNumber: string,
  retryCount = 0
): Promise<GenericVerificationResponse> => {
  try {
    return await apiRequest(...);
  } catch (error: any) {
    // Retry up to 2 times (3 total attempts) on timeout
    if (error.message.includes('Timeout') && retryCount < 2) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
      return verifyAadhaarFamilyMembers(aadhaarNumber, retryCount + 1);
    }
    throw error;
  }
};
```

**Benefits:**
- Handles temporary slowdowns
- 3 total attempts with 2-second delays
- Automatic recovery from transient issues

---

### 3. **Progress Feedback for Slow Requests** 📢
**File**: `client/pages/Dashboard.tsx`

Added toast notification after 5 seconds of waiting:
```typescript
const slowRequestToast = setTimeout(() => {
  toast({
    title: "⏳ Please Wait",
    description: "This verification is taking longer than usual...",
  });
}, 5000);
```

**Benefits:**
- Users know the request is still processing
- Reduces perceived waiting time
- Prevents users from clicking "Submit" multiple times

---

## 🚀 Additional Recommendations

### Short-Term Solutions

#### A. **Cache Responses**
Cache successful API responses for frequently-queried data:

```typescript
// In apiClient.ts
const cache = new Map<string, { data: any; timestamp: number }>();

export const verifyAadhaarFamilyMembers = async (aadhaarNumber: string) => {
  const cacheKey = `aadhaar-family-${aadhaarNumber}`;
  const cached = cache.get(cacheKey);
  
  // Return cached data if less than 1 hour old
  if (cached && Date.now() - cached.timestamp < 3600000) {
    return cached.data;
  }
  
  const response = await apiRequest(...);
  cache.set(cacheKey, { data: response, timestamp: Date.now() });
  return response;
};
```

#### B. **Show Estimated Wait Time**
Update the UI to show expected duration:

```tsx
{selectedVerification.value === 'aadhar-family-tree' && (
  <Alert>
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      ⏱️ This verification typically takes 10-20 seconds
    </AlertDescription>
  </Alert>
)}
```

#### C. **Queue System (Background Processing)**
For very slow APIs, implement a queue:

1. Submit request → Get job ID
2. Poll for status every 2-3 seconds
3. Display results when ready

---

### Long-Term Solutions

#### 1. **Backend Proxy with Timeout Extension**
Create a dedicated backend endpoint that:
- Calls the external API with longer timeouts
- Caches responses
- Handles retries server-side

**File**: `server/routes/aadhaar.ts` (NEW)
```typescript
import { RequestHandler } from "express";

export const handleAadhaarFamilyMembers: RequestHandler = async (req, res) => {
  try {
    const response = await fetch('https://osint-ninja.vercel.app/api/aadhaar/family-members', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.OSINT_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(504).json({ error: 'Gateway timeout' });
  }
};
```

**Register in `server/index.ts`:**
```typescript
import { handleAadhaarFamilyMembers } from "./routes/aadhaar";

app.post("/api/aadhaar/family-members", handleAadhaarFamilyMembers);
```

**Update `apiClient.ts`:**
```typescript
const BASE_URL = ''; // Use relative URLs to proxy through your backend
```

#### 2. **Upgrade Netlify Plan**
- Pro plan: 26-second timeout limit
- Business plan: 26-second timeout + better infrastructure

#### 3. **Switch to Alternative Hosting**
Consider platforms with longer timeout limits:
- **AWS Lambda**: 15 minutes max
- **Google Cloud Functions**: 9 minutes max
- **Azure Functions**: 10 minutes default, unlimited with Durable Functions
- **Railway/Render**: No hard timeout limits

#### 4. **Use a Faster API Provider**
If possible, find alternative data providers with:
- Lower latency
- Better SLA guarantees
- Faster response times

---

## 🧪 Testing

### Test Timeout Handling:
```bash
# Simulate slow network
curl -X POST http://localhost:8080/api/aadhaar/family-members \
  -H "Content-Type: application/json" \
  -d '{"aadhaar": "123456789012"}' \
  --max-time 30
```

### Monitor API Performance:
Add logging in `apiClient.ts`:
```typescript
const startTime = Date.now();
const response = await fetch(...);
const duration = Date.now() - startTime;
console.log(`API call took ${duration}ms`);
```

---

## 📊 Monitoring Recommendations

1. **Add API Metrics Dashboard**
   - Track response times
   - Monitor timeout rates
   - Alert on degraded performance

2. **User Notifications**
   - Show system status page
   - Email alerts for service issues
   - In-app status indicators

3. **Error Tracking**
   - Integrate Sentry or similar
   - Track timeout patterns
   - Analyze peak failure times

---

## 🔧 Quick Fixes Summary

✅ **Already Implemented:**
1. 25-second client-side timeout
2. Automatic retry logic (3 attempts)
3. User-friendly progress notifications
4. Clear error messages

🔄 **Recommended Next Steps:**
1. Add response caching
2. Create backend proxy endpoint
3. Show estimated wait times
4. Consider hosting platform upgrade

---

## 📞 Support

If timeouts persist after implementing these solutions:

1. **Check API Status**: Verify `https://osint-ninja.vercel.app` is operational
2. **Test Network**: Run speed tests from your deployment region
3. **Review Logs**: Check browser console and server logs for patterns
4. **Contact API Provider**: Report consistent slow responses

---

## 🎓 Additional Resources

- [Netlify Function Limits](https://docs.netlify.com/functions/overview/#default-deployment-options)
- [Handling Timeouts in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [API Retry Strategies](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
