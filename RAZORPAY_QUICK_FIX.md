# 🚨 Razorpay Quick Fix Reference Card

## Most Common Issues & Instant Solutions

### 🔴 Issue #1: "Payment doesn't load on hosted site"

**Quick Check:**
```javascript
// Open browser console (F12) and type:
console.log(import.meta.env.VITE_API_BASE_URL);
```

**Expected:** `https://osint-ninja.vercel.app`  
**If undefined:** Environment variable not set!

**Fix:**
```bash
# Netlify/Vercel Dashboard:
Add Environment Variable:
Name: VITE_API_BASE_URL
Value: https://osint-ninja.vercel.app

Then REDEPLOY!
```

---

### 🔴 Issue #2: "CORS Policy Error"

**Error in Console:**
```
Access to fetch at 'https://osint-ninja.vercel.app/api/...' 
has been blocked by CORS policy
```

**Fix (Backend settings.py):**
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-netlify-app.netlify.app",  # ← Add your domain!
    "https://your-custom-domain.com"
]
```

**Quick Test:**
```bash
curl -I -X OPTIONS https://osint-ninja.vercel.app/api/create_razorpay_order \
  -H "Origin: https://your-frontend-domain.com"

# Look for: Access-Control-Allow-Origin: https://your-frontend-domain.com
```

---

### 🔴 Issue #3: "Invalid order data received"

**Error in Console:**
```
❌ Invalid order response: {order_id: undefined, razorpay_key_id: undefined}
```

**Cause:** Backend not returning order data

**Fix:**
1. Check backend logs
2. Verify endpoint `/api/create_razorpay_order` exists
3. Test directly:
```bash
curl -X POST https://osint-ninja.vercel.app/api/create_razorpay_order \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN" \
  -d '{"amount": 100, "idempotency_key": "test-123"}'

# Expected: {"order_id":"order_...","razorpay_key_id":"rzp_..."}
```

---

### 🔴 Issue #4: "Payment verification failed"

**Error in Console:**
```
❌ Payment verification failed: Signature mismatch
```

**Cause:** Wrong `RAZORPAY_KEY_SECRET` on backend

**Fix:**
```python
# Backend: Check environment variable
import os
print(os.environ.get('RAZORPAY_KEY_SECRET'))  # Should NOT be None

# settings.py should use:
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET')
# NOT hardcoded!
```

---

### 🔴 Issue #5: "Works locally but not in production"

**Checklist:**

| Check | Command/Location |
|-------|------------------|
| ✅ Env var set | Hosting dashboard → Environment Variables |
| ✅ CORS configured | Backend `CORS_ALLOWED_ORIGINS` |
| ✅ HTTPS enabled | Frontend URL starts with `https://` |
| ✅ Backend reachable | `curl https://osint-ninja.vercel.app/api/health` |
| ✅ Razorpay script loads | Browser console: `typeof window.Razorpay` → "function" |

---

## 🔍 Quick Debugging Commands

### 1. Test Backend Connectivity
```bash
curl https://osint-ninja.vercel.app/api/health
```

### 2. Test Order Creation
```bash
curl -X POST https://osint-ninja.vercel.app/api/create_razorpay_order \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_AUTH_TOKEN" \
  -d '{"amount": 100, "idempotency_key": "test-123"}'
```

### 3. Check Environment Variable (Browser)
```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
```

### 4. Check Razorpay Script Loaded
```javascript
console.log(window.Razorpay);  // Should be a function
```

### 5. Monitor Network Requests
```
1. Open DevTools (F12)
2. Go to Network tab
3. Filter: Fetch/XHR
4. Try payment
5. Check failed requests
```

---

## 📊 Error Code Decoder

| Console Message | Meaning | Fix |
|----------------|---------|-----|
| `Failed to fetch` | Network/CORS issue | Check BASE_URL, CORS config |
| `401 Unauthorized` | Missing/invalid token | Check Authorization header |
| `404 Not Found` | Endpoint doesn't exist | Verify backend API endpoint |
| `500 Internal Server Error` | Backend crash | Check backend logs |
| `Non-JSON response` | Backend returned HTML | Backend error, check logs |
| `Signature mismatch` | Wrong secret key | Check RAZORPAY_KEY_SECRET |

---

## ⚡ Emergency Fixes

### If nothing works:

1. **Clear everything:**
   ```javascript
   // Browser console
   localStorage.clear();
   sessionStorage.clear();
   ```
   Then refresh (Ctrl+Shift+R)

2. **Test with curl:**
   ```bash
   # If this works, frontend issue
   curl -X POST https://osint-ninja.vercel.app/api/create_razorpay_order \
     -H "Content-Type: application/json" \
     -H "Authorization: Token TOKEN" \
     -d '{"amount": 100, "idempotency_key": "test"}'
   ```

3. **Check backend is up:**
   ```bash
   curl -I https://osint-ninja.vercel.app
   # Should return: 200 OK
   ```

4. **Verify HTTPS:**
   - Frontend MUST be https://
   - Backend MUST be https://
   - Mixed content = blocked

---

## 📞 Where to Look

| Issue Type | Where to Check |
|------------|----------------|
| Frontend error | Browser Console (F12) |
| Network error | DevTools → Network tab |
| Backend error | Backend server logs |
| CORS error | Browser Console + Backend logs |
| Payment error | Razorpay Dashboard + Console |

---

## ✅ 30-Second Health Check

Run this in browser console:
```javascript
// Health check script
console.log("=== Razorpay Health Check ===");
console.log("1. API URL:", import.meta.env.VITE_API_BASE_URL || "❌ NOT SET");
console.log("2. Razorpay Loaded:", typeof window.Razorpay === 'function' ? "✅" : "❌");
console.log("3. Auth Token:", localStorage.getItem('authToken') ? "✅" : "❌");

fetch(import.meta.env.VITE_API_BASE_URL + '/api/health')
  .then(r => console.log("4. Backend:", r.ok ? "✅" : "❌"))
  .catch(e => console.log("4. Backend: ❌", e.message));
```

**Expected Output:**
```
=== Razorpay Health Check ===
1. API URL: https://osint-ninja.vercel.app
2. Razorpay Loaded: ✅
3. Auth Token: ✅
4. Backend: ✅
```

---

## 🎯 Most Likely Cause

**95% of hosted platform failures are:**

1. **Environment variable not set** (40%)
2. **CORS not configured** (35%)
3. **HTTPS/HTTP mismatch** (15%)
4. **Backend keys wrong** (10%)

**Fix these four things first!**

---

**Print this and keep handy during deployment! 📋**
