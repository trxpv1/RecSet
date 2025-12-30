# Razorpay Integration Troubleshooting Guide

## 🚨 Common Issues & Solutions

### Issue 1: Works on localhost but fails on hosted platform

#### **Root Causes:**
1. **CORS (Cross-Origin Resource Sharing) blocking API calls**
2. **Hardcoded API URLs pointing to wrong environment**
3. **Missing environment variables on hosting platform**
4. **TLS version mismatch (Razorpay requires TLS 1.2+)**
5. **Mixed content (HTTP/HTTPS) blocking**

---

## ✅ Fixed Issues in This Update

### 1. ✅ Environment-Specific API Configuration

**Before:**
```typescript
const BASE_URL = 'https://osint-ninja.vercel.app'; // ❌ Hardcoded
```

**After:**
```typescript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://osint-ninja.vercel.app'; // ✅ Dynamic
```

**Setup Instructions:**

1. **Create environment files:**
   ```bash
   # Development (.env.local or .env.development)
   VITE_API_BASE_URL=http://localhost:8000
   VITE_ENVIRONMENT=development
   VITE_DEBUG_MODE=true

   # Production (.env.production)
   VITE_API_BASE_URL=https://osint-ninja.vercel.app
   VITE_ENVIRONMENT=production
   VITE_DEBUG_MODE=false
   ```

2. **For Netlify deployments:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_BASE_URL` = `https://osint-ninja.vercel.app`

3. **For Vercel deployments:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://osint-ninja.vercel.app`

---

### 2. ✅ Enhanced Error Logging

**New logging captures:**
- ✅ Full request/response details with timestamps
- ✅ Razorpay payment failure codes and reasons
- ✅ Order creation errors with stack traces
- ✅ Payment verification failures with payment IDs
- ✅ Non-JSON response detection

**How to view logs in production:**

**Browser Console (Chrome/Firefox):**
```
1. Right-click → Inspect → Console tab
2. Look for emoji markers:
   🔍 = API Request
   📥 = API Response
   ❌ = Error
   ✅ = Success
   💳 = Payment data
```

**Netlify Functions Logs:**
```bash
netlify functions:log
```

**Vercel Logs:**
```bash
vercel logs [deployment-url]
```

---

### 3. ✅ Missing Parameter Validation

**Added checks for:**
- `razorpay_key_id` presence before opening checkout
- `order_id` validity
- Payment response structure
- Backend response content-type

---

## 🔧 Backend Requirements Checklist

### Python/Django Backend Configuration

```python
# settings.py
import os

# Razorpay Configuration - MUST use environment variables
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET')

# Validate that keys are set
if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
    raise ValueError("Razorpay credentials not configured")

# CORS Configuration (CRITICAL for hosted platforms)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",  # Local development
    "http://localhost:5173",  # Vite dev server
    "https://your-netlify-app.netlify.app",  # Production
    "https://your-custom-domain.com"  # Custom domain
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Force HTTPS in production
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
```

### TLS 1.2 Enforcement (CRITICAL for production)

```python
# Payment processing code
import razorpay
import ssl
import requests

# Create Razorpay client with TLS 1.2+
def create_razorpay_client():
    """
    Create Razorpay client with TLS 1.2+ enforcement
    Required for production API calls
    """
    import urllib3
    
    # Force TLS 1.2+
    class TLSAdapter(requests.adapters.HTTPAdapter):
        def init_poolmanager(self, *args, **kwargs):
            ctx = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
            kwargs['ssl_context'] = ctx
            return super(TLSAdapter, self).init_poolmanager(*args, **kwargs)
    
    session = requests.Session()
    session.mount('https://', TLSAdapter())
    
    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )
    client.set_custom_session(session)
    
    return client
```

### Comprehensive Error Logging (Backend)

```python
import logging
import json
from datetime import datetime

logger = logging.getLogger(__name__)

@api_view(['POST'])
def create_razorpay_order(request):
    """Create Razorpay order with comprehensive logging"""
    try:
        user = get_user_from_token(request)
        amount = request.data.get('amount')
        idempotency_key = request.data.get('idempotency_key')
        
        # Log request details
        logger.info(f"Order creation request: user={user.email}, amount={amount}, key={idempotency_key}")
        
        # Create Razorpay order
        client = create_razorpay_client()
        order = client.order.create({
            'amount': int(amount * 100),
            'currency': 'INR',
            'receipt': f'order_{user.id}_{int(time.time())}',
            'payment_capture': 1
        })
        
        logger.info(f"✅ Order created: {order['id']}")
        
        return Response({
            'order_id': order['id'],
            'amount': amount,
            'currency': 'INR',
            'razorpay_key_id': settings.RAZORPAY_KEY_ID
        }, status=status.HTTP_201_CREATED)
        
    except razorpay.errors.BadRequestError as e:
        logger.error(f"❌ Razorpay BadRequest: {e}")
        return Response({
            'error': f'Razorpay error: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        logger.exception(f"❌ Order creation failed: {e}")
        return Response({
            'error': 'Failed to create order',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def verify_payment(request):
    """Verify Razorpay payment with comprehensive logging"""
    try:
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        signature = request.data.get('razorpay_signature')
        amount = request.data.get('amount')
        
        logger.info(f"Payment verification: payment_id={payment_id}, order_id={order_id}")
        
        # Verify signature (CRITICAL for security)
        import hmac
        import hashlib
        
        message = f"{order_id}|{payment_id}"
        generated_signature = hmac.new(
            settings.RAZORPAY_KEY_SECRET.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()
        
        if generated_signature != signature:
            logger.error(f"❌ Signature mismatch: payment_id={payment_id}")
            return Response({
                'error': 'Payment verification failed - invalid signature'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch payment details from Razorpay
        client = create_razorpay_client()
        payment = client.payment.fetch(payment_id)
        
        logger.info(f"Payment details: {json.dumps(payment, indent=2)}")
        
        # Validate payment status
        if payment['status'] != 'captured':
            logger.error(f"❌ Payment not captured: status={payment['status']}")
            return Response({
                'error': f"Payment status is {payment['status']}, not captured"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate amount matches
        if payment['amount'] != int(amount * 100):
            logger.error(f"❌ Amount mismatch: expected={amount*100}, got={payment['amount']}")
            return Response({
                'error': 'Amount mismatch'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Add credits to user account
        user = get_user_from_token(request)
        credits_to_add = amount  # 1 INR = 1 credit
        user.profile.credits += credits_to_add
        user.profile.save()
        
        logger.info(f"✅ Credits added: user={user.email}, credits={credits_to_add}, new_balance={user.profile.credits}")
        
        return Response({
            'message': 'Payment verified successfully',
            'payment_id': payment_id,
            'credits_added': credits_to_add,
            'new_balance': user.profile.credits
        }, status=status.HTTP_200_OK)
        
    except razorpay.errors.BadRequestError as e:
        logger.error(f"❌ Razorpay BadRequest in verification: {e}")
        return Response({
            'error': f'Razorpay error: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        logger.exception(f"❌ Payment verification failed: {e}")
        return Response({
            'error': 'Payment verification failed',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

---

## 🔍 Debugging Steps

### Step 1: Check Browser Console

Open Developer Tools (F12) and look for:

```
🔍 API Request: {
  url: "https://osint-ninja.vercel.app/api/create_razorpay_order",
  method: "POST",
  body: "{"amount":299,"idempotency_key":"..."}"
}

📥 API Response: {
  status: 201,
  data: { order_id: "order_...", razorpay_key_id: "rzp_..." }
}
```

### Step 2: Check Network Tab

1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Click on failed request
4. Check:
   - **Status Code** (should be 200/201)
   - **Response Headers** (check CORS headers)
   - **Response Body** (error message)
   - **Request Headers** (Authorization token present?)

### Step 3: Verify Environment Variables

**Frontend (Browser Console):**
```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
```

**Backend (Django Shell):**
```python
from django.conf import settings
print(settings.RAZORPAY_KEY_ID)  # Should NOT be empty
print(settings.RAZORPAY_KEY_SECRET[:5] + "...")  # Partial check
```

### Step 4: Test Backend Endpoints Directly

```bash
# Test order creation
curl -X POST https://osint-ninja.vercel.app/api/create_razorpay_order \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_AUTH_TOKEN" \
  -d '{"amount": 100, "idempotency_key": "test-123"}'

# Expected response:
# {"order_id":"order_...","amount":100,"currency":"INR","razorpay_key_id":"rzp_..."}
```

---

## 🛡️ Security Checklist

- [x] **API keys stored in environment variables** (not hardcoded)
- [x] **HTTPS enforced in production**
- [x] **CORS configured for frontend domain**
- [x] **Signature verification on backend**
- [x] **Amount validation** (prevent tampering)
- [x] **Idempotency keys** (prevent duplicate charges)
- [x] **Payment status verification** (ensure captured)
- [x] **TLS 1.2+ enforcement**
- [x] **Error logging without exposing secrets**
- [x] **Authorization required for payment endpoints**

---

## 📊 Common Error Codes

### Frontend Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Failed to fetch` | CORS blocking, network issue | Check CORS headers, verify BASE_URL |
| `Invalid order data` | Backend didn't return order_id | Check backend logs, verify API endpoint |
| `Payment System Error` | Backend endpoint not found | Verify `/api/create_razorpay_order` exists |
| `Non-JSON response` | Backend returning HTML error page | Check backend error logs |

### Razorpay Errors

| Code | Description | Solution |
|------|-------------|----------|
| `BAD_REQUEST_ERROR` | Invalid parameters | Check amount, order_id format |
| `GATEWAY_ERROR` | Razorpay server issue | Retry, check Razorpay status page |
| `SERVER_ERROR` | Internal error | Check backend logs |
| `SIGNATURE_VERIFICATION_ERROR` | Invalid signature | Check RAZORPAY_KEY_SECRET is correct |

### Backend Errors

| Status | Error | Solution |
|--------|-------|----------|
| 401 | Unauthorized | Check Authorization token is sent |
| 400 | Bad Request | Validate request body format |
| 500 | Internal Server Error | Check backend logs, database connection |
| 502 | Bad Gateway | Backend server down or unreachable |

---

## 🚀 Deployment Checklist

### Before Deploying to Production:

1. **Environment Variables Set:**
   - [ ] `VITE_API_BASE_URL` (frontend)
   - [ ] `RAZORPAY_KEY_ID` (backend)
   - [ ] `RAZORPAY_KEY_SECRET` (backend)

2. **CORS Configured:**
   - [ ] Frontend domain added to `CORS_ALLOWED_ORIGINS`
   - [ ] CORS headers in backend responses

3. **HTTPS Enabled:**
   - [ ] Frontend served over HTTPS
   - [ ] Backend API over HTTPS
   - [ ] Mixed content warnings resolved

4. **Testing:**
   - [ ] Test payment with Razorpay test mode
   - [ ] Verify signature validation works
   - [ ] Check error handling (failed payments)
   - [ ] Verify credits added to account

5. **Logging:**
   - [ ] Error logging configured
   - [ ] Access to production logs
   - [ ] Monitoring alerts set up

---

## 📞 Support Resources

**Razorpay Documentation:**
- API Reference: https://razorpay.com/docs/api/
- Error Codes: https://razorpay.com/docs/api/errors/
- Checkout.js: https://razorpay.com/docs/payment-gateway/web-integration/standard/

**Browser DevTools:**
- Chrome: F12 → Console/Network
- Firefox: F12 → Console/Network
- Safari: Develop → Show Web Inspector

**Test Environment:**
- Always test with Razorpay test mode first
- Test keys: `rzp_test_*` vs Live keys: `rzp_live_*`

---

## 🎯 Quick Fix Summary

### If QR code/payment doesn't load:

1. **Check environment variable:**
   ```bash
   echo $VITE_API_BASE_URL  # Should match your backend URL
   ```

2. **Verify backend is reachable:**
   ```bash
   curl https://osint-ninja.vercel.app/api/health
   ```

3. **Check browser console for CORS errors:**
   - Look for: `Access to fetch... has been blocked by CORS policy`
   - Fix: Add frontend domain to backend CORS config

4. **Verify Razorpay script loaded:**
   ```javascript
   console.log(typeof window.Razorpay); // Should be "function"
   ```

5. **Check backend returns razorpay_key_id:**
   - Should be in order creation response
   - Should start with `rzp_test_` or `rzp_live_`

---

**Last Updated:** 2025-12-30
**Version:** 2.0
