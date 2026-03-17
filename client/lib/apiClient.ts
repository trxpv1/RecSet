/**
 * API Client for backend communication
 * Handles HTTP requests, token management, and error handling
 */

// Use environment variable for API base URL (supports dev/staging/prod)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://osint-ninja.vercel.app';

type JsonRecord = Record<string, any>;

interface EndpointDiagnosticProfile {
  serviceLabel: string;
  cardKey?: string;
  expectedBodyFields?: string[];
  commonBackendRisks: string[];
}

interface BackendDiagnosis {
  probableCauses: string[];
  immediateActions: string[];
  likelyOwner: 'frontend' | 'backend' | 'network' | 'mixed';
}

export interface ApiClientError extends Error {
  requestId?: string;
  endpoint?: string;
  method?: string;
  status?: number;
  backendDiagnosis?: BackendDiagnosis;
}

const ENDPOINT_DIAGNOSTICS: Record<string, EndpointDiagnosticProfile> = {
  '/api/pan/pan-comprehensive': {
    serviceLabel: 'PAN Details',
    cardKey: 'pan-info',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['PAN provider timeout', 'PAN source returned no records', 'invalid provider credentials'],
  },
  '/api/aadhaar/family-members': {
    serviceLabel: 'Aadhaar Family Tree',
    cardKey: 'aadhar-family-tree',
    expectedBodyFields: ['aadhaar'],
    commonBackendRisks: ['upstream provider latency', 'Aadhaar lookup throttling', 'provider-side unavailable records'],
  },
  '/api/driving-license/driving-license': {
    serviceLabel: 'Driving License',
    cardKey: 'driving-license',
    expectedBodyFields: ['id_number', 'dob'],
    commonBackendRisks: ['DOB format mismatch at backend validator', 'license data source unavailable'],
  },
  '/api/corporate/din': {
    serviceLabel: 'DIN Lookup',
    cardKey: 'din-lookup',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['DIN service rate-limited', 'corporate dataset stale/unavailable'],
  },
  '/api/corporate/director-phone': {
    serviceLabel: 'Director Phone',
    cardKey: 'director-phone',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['director contact source unavailable', 'restricted dataset access'],
  },
  '/api/corporate/gstin-advanced': {
    serviceLabel: 'GSTIN Advanced',
    cardKey: 'gstin-advanced',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['GST provider timeout', 'insufficient org-level entitlement'],
  },
  '/api/corporate/cin-to-pan': {
    serviceLabel: 'CIN to PAN',
    cardKey: 'cin-to-pan',
    expectedBodyFields: ['cin_number'],
    commonBackendRisks: ['corporate source mismatch', 'CIN not mapped in provider'],
  },
  '/api/gstin/search-by-company-name': {
    serviceLabel: 'Company Name to GSTIN',
    cardKey: 'gstin-by-company-name',
    expectedBodyFields: ['company_name'],
    commonBackendRisks: ['premium endpoint not activated for company', 'search index unavailable'],
  },
  '/api/gstin/search-by-pan': {
    serviceLabel: 'PAN to All GST',
    cardKey: 'gstin-by-pan',
    expectedBodyFields: ['pan'],
    commonBackendRisks: ['PAN-to-GST mapping source unavailable'],
  },
  '/api/bank-verification/bank-verification-mobile': {
    serviceLabel: 'Bank Verification Mobile',
    cardKey: 'bank-verification-mobile',
    expectedBodyFields: ['mobile_number'],
    commonBackendRisks: ['bank verification provider degraded', 'mobile not linked in provider dataset'],
  },
  '/api/bank-verification/mobile-to-multiple-upi': {
    serviceLabel: 'Mobile to Multiple UPI',
    cardKey: 'mobile-to-multiple-upi',
    expectedBodyFields: ['mobile_number'],
    commonBackendRisks: ['UPI provider throttling', 'empty provider mapping for mobile'],
  },
  '/api/bank-verification/mobile-to-pan': {
    serviceLabel: 'Mobile Number to PAN Card',
    cardKey: 'mobile-to-pan',
    expectedBodyFields: ['mobile_number'],
    commonBackendRisks: ['mobile-to-pan source unavailable', 'no linked identity record'],
  },
  '/api/bank-verification/upi-to-bank-details': {
    serviceLabel: 'UPI to Bank Details',
    cardKey: 'upi-to-bank-details',
    expectedBodyFields: ['upi_id'],
    commonBackendRisks: ['UPI provider timeout', 'bank details redaction policy blocking response'],
  },
  '/api/rc/rc-full': {
    serviceLabel: 'RC Full Details',
    cardKey: 'rc-full',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['vehicle registry source timeout', 'invalid RC format rejected upstream'],
  },
  '/api/rc/rc-owner-history': {
    serviceLabel: 'RC Owner History',
    cardKey: 'rc-owner-history',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['ownership-history source unavailable', 'historical data provider delay'],
  },
  '/api/rc/rc-to-mobile-number': {
    serviceLabel: 'RC to Mobile',
    cardKey: 'rc-to-mobile',
    expectedBodyFields: ['rc_number'],
    commonBackendRisks: ['PII redaction policy from provider', 'mobile mapping not present'],
  },
  '/api/rc/mobile-number-to-rc': {
    serviceLabel: 'Mobile to RC',
    cardKey: 'mobile-to-rc',
    expectedBodyFields: ['mobile_number'],
    commonBackendRisks: ['reverse mapping index unavailable', 'mobile not linked in provider'],
  },
  '/api/rc/chassis-to-rc-details': {
    serviceLabel: 'Chassis to RC',
    cardKey: 'chassis-to-rc',
    expectedBodyFields: ['chassis_number'],
    commonBackendRisks: ['chassis mapping source missing', 'legacy source lookup timeout'],
  },
  '/api/fastag/tag-to-rc': {
    serviceLabel: 'FASTag to RC',
    cardKey: 'fastag-to-rc',
    expectedBodyFields: ['tag_id'],
    commonBackendRisks: ['FASTag bridge API unavailable', 'tag not found in provider'],
  },
  '/api/fastag/rc-to-tag': {
    serviceLabel: 'RC to FASTag',
    cardKey: 'rc-to-fastag',
    expectedBodyFields: ['rc_number'],
    commonBackendRisks: ['FASTag source latency spikes', 'vehicle not linked to FASTag'],
  },
  '/api/fampay/upi-to-mobile': {
    serviceLabel: 'FamPay UPI to Mobile',
    cardKey: 'fampay-upi-to-mobile',
    expectedBodyFields: ['fam_id'],
    commonBackendRisks: ['FamPay source unavailable', 'UPI handle not recognized by provider'],
  },
  '/api/prefill/prefill-by-mobile': {
    serviceLabel: 'Mobile Intelligence',
    cardKey: 'mobile-intelligence',
    expectedBodyFields: ['mobile'],
    commonBackendRisks: ['prefill engine timeout', 'insufficient provider coverage for number'],
  },
  '/api/address/mobile-to-address': {
    serviceLabel: 'Mobile to Address',
    cardKey: 'mobile-to-address-enhanced',
    expectedBodyFields: ['mobile'],
    commonBackendRisks: ['address provider partial outage', 'backend transformer mismatch'],
  },
  '/api/voter-id/voter-id-info': {
    serviceLabel: 'Voter ID Text',
    cardKey: 'voter-id-text',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['electoral source unavailable', 'id format rejected by backend validator'],
  },
  '/api/income/mobile-to-uan': {
    serviceLabel: 'Mobile to UAN',
    cardKey: 'mobile-to-uan',
    expectedBodyFields: ['mobile_number'],
    commonBackendRisks: ['employment source unavailable', 'mobile not mapped to UAN'],
  },
  '/api/income/uan-to-employment-history': {
    serviceLabel: 'UAN Employment History V2',
    cardKey: 'uan-employment-history',
    expectedBodyFields: ['id_number'],
    commonBackendRisks: ['employment-history provider timeout', 'EPFO data unavailable for UAN'],
  },
  '/api/pan/pan-to-uan': {
    serviceLabel: 'PAN to UAN',
    cardKey: 'pan-to-uan',
    expectedBodyFields: ['pan_number'],
    commonBackendRisks: ['PAN-UAN linkage source unavailable', 'no linkage in provider'],
  },
  '/api/gas-connection/verify': {
    serviceLabel: 'Mobile to GAS Connection',
    cardKey: 'mobile-to-gas',
    expectedBodyFields: ['mobile_number', 'provider_name'],
    commonBackendRisks: ['provider_name validation failure', 'gas provider integration unavailable'],
  },
  '/api/create_razorpay_order': {
    serviceLabel: 'Wallet Recharge - Create Order',
    expectedBodyFields: ['amount', 'idempotency_key'],
    commonBackendRisks: ['payment gateway key misconfiguration', 'order creation blocked by backend rule'],
  },
  '/api/verify_payment': {
    serviceLabel: 'Wallet Recharge - Verify Payment',
    expectedBodyFields: ['razorpay_payment_id', 'razorpay_order_id', 'razorpay_signature', 'amount', 'token'],
    commonBackendRisks: ['signature verification failed at backend', 'payment verification webhook mismatch'],
  },
};

const SENSITIVE_KEYS = ['token', 'password', 'signature', 'auth', 'authorization', 'mobile', 'aadhaar', 'pan', 'id_number', 'email', 'upi'];

const createRequestId = (): string => `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const normalizeHeaders = (input?: HeadersInit): Record<string, string> => {
  if (!input) return {};

  if (input instanceof Headers) {
    const normalized: Record<string, string> = {};
    input.forEach((value, key) => {
      normalized[key] = value;
    });
    return normalized;
  }

  if (Array.isArray(input)) {
    return input.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  }

  return { ...input };
};

const tryParseJson = (value: string): JsonRecord | null => {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
};

const maskSensitiveValue = (key: string, value: any): any => {
  const lowerKey = key.toLowerCase();
  const shouldMask = SENSITIVE_KEYS.some(sensitiveKey => lowerKey.includes(sensitiveKey));

  if (!shouldMask) {
    if (Array.isArray(value)) {
      return value.map(item => (typeof item === 'object' && item !== null ? maskSensitiveObject(item) : item));
    }

    if (typeof value === 'object' && value !== null) {
      return maskSensitiveObject(value as JsonRecord);
    }

    return value;
  }

  if (typeof value === 'string') {
    if (value.length <= 4) return '****';
    return `${value.slice(0, 2)}****${value.slice(-2)}`;
  }

  return '[REDACTED]';
};

const maskSensitiveObject = (obj: JsonRecord): JsonRecord => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = maskSensitiveValue(key, value);
    return acc;
  }, {} as JsonRecord);
};

const extractRequestPayload = (body?: BodyInit | null): JsonRecord | string | undefined => {
  if (!body) return undefined;
  if (typeof body === 'string') {
    return tryParseJson(body) ?? body;
  }
  return '[non-json request body]';
};

const getEndpointProfile = (endpoint: string): EndpointDiagnosticProfile => {
  return ENDPOINT_DIAGNOSTICS[endpoint] || {
    serviceLabel: endpoint,
    commonBackendRisks: ['Endpoint-specific diagnostics not configured for this API'],
  };
};

const buildBackendDiagnosis = (
  endpoint: string,
  method: string,
  status: number | undefined,
  requestPayload: JsonRecord | string | undefined,
  responseData?: any,
  extraContext?: string
): BackendDiagnosis => {
  const profile = getEndpointProfile(endpoint);
  const probableCauses = new Set<string>(profile.commonBackendRisks);
  const immediateActions = new Set<string>();
  let likelyOwner: BackendDiagnosis['likelyOwner'] = 'mixed';

  const payloadObj = typeof requestPayload === 'object' && requestPayload !== null && !Array.isArray(requestPayload)
    ? requestPayload
    : undefined;

  if (profile.expectedBodyFields && method !== 'GET' && payloadObj) {
    const missingFields = profile.expectedBodyFields.filter(field => !(field in payloadObj));
    if (missingFields.length > 0) {
      probableCauses.add(`Request body missing expected fields: ${missingFields.join(', ')}`);
      immediateActions.add(`Fix frontend payload mapping for ${profile.serviceLabel}: include ${missingFields.join(', ')}`);
      likelyOwner = 'frontend';
    }
  }

  const errorMessage = String(responseData?.error || responseData?.message || extraContext || '').toLowerCase();
  const messageCode = String(responseData?.message_code || '').toLowerCase();

  if (status === 400) {
    probableCauses.add('Backend validation rejected request payload');
    immediateActions.add('Inspect backend validation error payload and align frontend field format');
    likelyOwner = likelyOwner === 'frontend' ? 'frontend' : 'mixed';
  }

  if (status === 401) {
    probableCauses.add('Token missing, expired, or invalid at backend auth layer');
    immediateActions.add('Re-authenticate and verify token forwarding in Authorization header');
    likelyOwner = 'mixed';
  }

  if (status === 403) {
    probableCauses.add('User/company lacks permission or premium entitlement for this endpoint');
    immediateActions.add('Check backend entitlement flags, account activation, and RBAC policy for this user');
    likelyOwner = 'backend';
  }

  if (status === 404) {
    probableCauses.add('Route missing on deployed backend or incorrect API prefix/version');
    immediateActions.add('Confirm backend deployment includes this route and gateway path rewrite is correct');
    likelyOwner = 'backend';
  }

  if (status === 429) {
    probableCauses.add('Rate limit reached in backend gateway or upstream provider');
    immediateActions.add('Apply retry with backoff and check provider quota usage');
    likelyOwner = 'backend';
  }

  if (status === 500) {
    probableCauses.add('Unhandled backend exception during service orchestration');
    immediateActions.add('Check backend logs with request trace and fix failing code path');
    likelyOwner = 'backend';
  }

  if (status === 502 || status === 503 || status === 504) {
    probableCauses.add('Upstream provider/network timeout while backend attempted lookup');
    immediateActions.add('Validate upstream provider health and increase timeout/circuit-breaker configuration if needed');
    likelyOwner = 'network';
  }

  if (messageCode === 'verification_failed' || errorMessage.includes('verification failed')) {
    probableCauses.add('Provider returned no matching record for supplied identifier');
    immediateActions.add('Re-check identifier format and verify data availability in provider source');
  }

  if (errorMessage.includes('has no attribute') || errorMessage.includes('object has no attribute')) {
    probableCauses.add('Backend model/schema mismatch or missing property mapping');
    immediateActions.add('Patch backend serializer/model to include required attribute and redeploy');
    likelyOwner = 'backend';
  }

  if (errorMessage.includes('forbidden') || errorMessage.includes('not active')) {
    probableCauses.add('Backend account/company activation prerequisite not satisfied');
    immediateActions.add('Enable company-level access for this endpoint in backend admin settings');
    likelyOwner = 'backend';
  }

  if (extraContext?.toLowerCase().includes('non-json')) {
    probableCauses.add('Gateway/reverse-proxy returned HTML (likely 404/5xx page) instead of API JSON');
    immediateActions.add('Check API base URL, ingress route, and proxy target for this environment');
    likelyOwner = 'network';
  }

  if (likelyOwner === 'mixed' && status && status >= 500) {
    likelyOwner = 'backend';
  }

  return {
    probableCauses: [...probableCauses],
    immediateActions: [...immediateActions],
    likelyOwner,
  };
};

// Helper to get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper to save auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Helper to remove auth token
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Generic API request handler with timeout support
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const requestId = createRequestId();
  const requestStart = performance.now();
  const method = options.method || 'GET';
  const endpointProfile = getEndpointProfile(endpoint);
  const requestPayload = extractRequestPayload(options.body);
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...normalizeHeaders(options.headers),
  };

  // Don't send Authorization header for login/register endpoints
  // These endpoints are used to GET a token, not authenticate with one
  const isAuthEndpoint = endpoint === '/api/login' || endpoint === '/api/register';
  
  // Add authorization header if token exists (but NOT for auth endpoints)
  if (token && !isAuthEndpoint) {
    headers['Authorization'] = `Token ${token}`;
  }

  console.groupCollapsed(`🚀 [API][${requestId}] ${method} ${endpoint}`);
  console.log('📌 Service Context:', {
    requestId,
    serviceLabel: endpointProfile.serviceLabel,
    cardKey: endpointProfile.cardKey || 'N/A',
    url: `${BASE_URL}${endpoint}`,
    method,
    hasAuthToken: !!token,
    expectedBodyFields: endpointProfile.expectedBodyFields || [],
    requestPayload: typeof requestPayload === 'object' && requestPayload !== null
      ? maskSensitiveObject(requestPayload as JsonRecord)
      : requestPayload,
    headers: { ...headers, Authorization: token ? '[REDACTED]' : 'none' },
    timestamp: new Date().toISOString(),
  });
  console.groupEnd();

  try {
    // Create an AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout (increased for slower verification APIs)

    if (options.signal) {
      if (options.signal.aborted) {
        controller.abort();
      } else {
        options.signal.addEventListener('abort', () => controller.abort(), { once: true });
      }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    // Try to parse JSON response
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Non-JSON response (e.g., HTML error page)
      const text = await response.text();
      const diagnosis = buildBackendDiagnosis(
        endpoint,
        method,
        response.status,
        requestPayload,
        undefined,
        `non-json response: ${text.substring(0, 120)}`
      );

      console.groupCollapsed(`❌ [API][${requestId}] Non-JSON response`);
      console.error('🚨 Response Format Mismatch:', {
        requestId,
        status: response.status,
        contentType,
        bodyPreview: text.substring(0, 200),
        backendDiagnosis: diagnosis,
      });
      console.groupEnd();

      const nonJsonError = new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}`) as ApiClientError;
      nonJsonError.requestId = requestId;
      nonJsonError.endpoint = endpoint;
      nonJsonError.method = method;
      nonJsonError.status = response.status;
      nonJsonError.backendDiagnosis = diagnosis;
      throw nonJsonError;
    }

    const durationMs = Math.round(performance.now() - requestStart);

    console.groupCollapsed(`📥 [API][${requestId}] Response received (${durationMs}ms)`);
    console.log('✅ Response Summary:', {
      requestId,
      status: response.status,
      ok: response.ok,
      endpoint,
      serviceLabel: endpointProfile.serviceLabel,
      messageCode: data?.message_code,
      hasSuccessFlag: typeof data?.success !== 'undefined',
      success: data?.success,
      hasData: !!data?.data,
      dataKeys: data?.data ? Object.keys(data.data) : [],
      creditDetails: data?.credit_details,
      timestamp: new Date().toISOString(),
    });
    console.groupEnd();

    // Handle errors
    if (!response.ok) {
      const diagnosis = buildBackendDiagnosis(endpoint, method, response.status, requestPayload, data);

      // Enhanced error logging for production debugging
      console.groupCollapsed(`❌ [API][${requestId}] Error response (${response.status})`);
      console.error('🚨 API Error Diagnostics:', {
        requestId,
        serviceLabel: endpointProfile.serviceLabel,
        status: response.status,
        statusText: response.statusText,
        endpoint,
        method,
        error: data.error || data,
        message_code: data.message_code,
        timestamp: new Date().toISOString(),
      });
      console.error('🧭 Potential Backend Root Cause Analysis:', {
        requestId,
        likelyOwner: diagnosis.likelyOwner,
        probableCauses: diagnosis.probableCauses,
        immediateActions: diagnosis.immediateActions,
      });
      console.groupEnd();
      
      // Provide more specific error messages based on error type
      let errorMessage = data.error || data.message || 'Something went wrong';
      
      // Check if it's a "verification failed" error (typically means no data found)
      if (data.message_code === 'verification_failed' || errorMessage.toLowerCase().includes('verification failed')) {
        errorMessage = 'Verification Failed';
      } else if (response.status === 403 || errorMessage.toLowerCase().includes('forbidden')) {
        // For 403 errors, use the actual server message if available (e.g., "Account not active")
        // Provide specific guidance for restricted API endpoints
        if (!data.error && !data.message) {
          errorMessage = 'Forbidden Access - This API requires account activation or special permissions. Please contact support to enable this feature.';
        } else if (data.error && data.error.toLowerCase().includes('company')) {
          errorMessage = 'Account Setup Required - Your account needs additional configuration. Please contact support to activate premium features.';
        }
        // Otherwise keep the original errorMessage from the server
      } else if (response.status === 504 || errorMessage.toLowerCase().includes('timed out')) {
        errorMessage = 'Request Timeout - The verification service is taking too long to respond';
      } else if (response.status === 404) {
        // Special handling for forgot password endpoint
        if (endpoint === '/api/forgot_password') {
          errorMessage = 'User doesn\'t exist - No account found with this email address';
        } else {
          errorMessage = 'Service endpoint not found';
        }
      } else if (response.status === 401) {
        // Special handling for forgot password endpoint
        if (endpoint === '/api/forgot_password') {
          errorMessage = 'User doesn\'t exist - No account found with this email address';
        } else {
          errorMessage = 'Unauthorized - please login again';
        }
      } else if (response.status === 503) {
        errorMessage = 'Service temporarily unavailable - please try again later';
      } else if (response.status >= 500) {
        errorMessage = 'Server error - please try again later';
      }
      
      const apiError = new Error(errorMessage) as ApiClientError;
      apiError.requestId = requestId;
      apiError.endpoint = endpoint;
      apiError.method = method;
      apiError.status = response.status;
      apiError.backendDiagnosis = diagnosis;
      throw apiError;
    }

    return data;
  } catch (fetchError: any) {
    // Handle abort/timeout errors
    if (fetchError.name === 'AbortError') {
      const diagnosis = buildBackendDiagnosis(endpoint, method, 504, requestPayload, undefined, 'request timeout');
      console.groupCollapsed(`⏱️ [API][${requestId}] Request timeout`);
      console.error('⏱️ Timeout Diagnostics:', {
        requestId,
        serviceLabel: endpointProfile.serviceLabel,
        endpoint,
        timeout: '60s',
        timestamp: new Date().toISOString(),
        backendDiagnosis: diagnosis,
      });
      console.groupEnd();

      const timeoutError = new Error('Request Timeout - The verification service is taking too long to respond. Please try again in a moment.') as ApiClientError;
      timeoutError.requestId = requestId;
      timeoutError.endpoint = endpoint;
      timeoutError.method = method;
      timeoutError.status = 504;
      timeoutError.backendDiagnosis = diagnosis;
      throw timeoutError;
    }
    
    // Network or parsing errors
    const diagnosis = buildBackendDiagnosis(endpoint, method, undefined, requestPayload, undefined, fetchError?.message);
    console.groupCollapsed(`❌ [API][${requestId}] Request failed before response`);
    console.error('❌ API Request Failed:', {
      requestId,
      serviceLabel: endpointProfile.serviceLabel,
      endpoint,
      error: fetchError.message,
      stack: fetchError.stack,
      timestamp: new Date().toISOString(),
      backendDiagnosis: diagnosis,
    });
    console.groupEnd();

    if (typeof fetchError === 'object' && fetchError) {
      (fetchError as ApiClientError).requestId = (fetchError as ApiClientError).requestId || requestId;
      (fetchError as ApiClientError).endpoint = (fetchError as ApiClientError).endpoint || endpoint;
      (fetchError as ApiClientError).method = (fetchError as ApiClientError).method || method;
      (fetchError as ApiClientError).backendDiagnosis = (fetchError as ApiClientError).backendDiagnosis || diagnosis;
    }

    throw fetchError;
  }
}

// ==================== TYPE DEFINITIONS ====================

export interface RegisterData {
  company_api_key: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  dob?: string;
  phone?: string;
  address?: string;
  pin_code?: string;
  city?: string;
  state?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_verified: boolean;
    credits: number;
    phone?: string;
  };
  company: {
    id: number;
    name: string;
  };
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  new_password2: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
  new_password2: string;
}

// ==================== API METHODS ====================

export const authAPI = {
  /**
   * Register a new user
   * POST /api/register
   */
  register: async (data: RegisterData) => {
    return apiRequest<{ success: string }>('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Login user
   * POST /api/login
   */
  login: async (data: LoginData) => {
    return apiRequest<LoginResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Logout user
   * POST /api/logout
   */
  logout: async () => {
    return apiRequest<{ success: string }>('/api/logout', {
      method: 'POST',
    });
  },

  /**
   * Verify email with token
   * POST /api/verify_email
   */
  verifyEmail: async (token: string) => {
    return apiRequest<{ success: string }>('/api/verify_email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  /**
   * Change password (authenticated)
   * POST /api/change_password
   */
  changePassword: async (data: ChangePasswordData) => {
    return apiRequest<{ success: string }>('/api/change_password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Request password reset
   * POST /api/forgot_password
   */
  forgotPassword: async (data: ForgotPasswordData) => {
    return apiRequest<{ success: string }>('/api/forgot_password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Set new password with reset token
   * POST /api/set_new_password
   */
  resetPassword: async (data: ResetPasswordData) => {
    return apiRequest<{ success: string }>('/api/set_new_password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ==================== RAZORPAY PAYMENT API ====================
// NOTE: Backend endpoints need to be implemented before testing

export interface CreateOrderData {
  amount: number; // Amount in INR
  idempotency_key: string; // Unique key to prevent duplicate orders (UUID format)
}

export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
  razorpay_key_id: string; // Key from backend response
  message?: string;
}

export interface VerifyPaymentData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  amount: number;
  token: string; // Auth token required in body per API docs
}

export interface VerifyPaymentResponse {
  message: string;
  payment_id: string;
  credits_added: number;
  new_balance: number;
}

/**
 * Create Razorpay order
 * Backend endpoint: POST /api/create_razorpay_order
 * Status: ✅ IMPLEMENTED
 */
export const createOrder = async (data: CreateOrderData): Promise<CreateOrderResponse> => {
  return apiRequest<CreateOrderResponse>('/api/create_razorpay_order', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Verify Razorpay payment and add credits
 * Backend endpoint: POST /api/verify_payment
 * Per documentation: requires token in both Authorization header and request body
 */
export const verifyPayment = async (data: VerifyPaymentData): Promise<VerifyPaymentResponse> => {
  return apiRequest<VerifyPaymentResponse>('/api/verify_payment', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// ==================== USER LOGS & TRANSACTIONS API ====================

export interface UserLog {
  id: number;
  user_id: number;
  input: string;
  action: string;
  timestamp: string;
  response: string;
  credits_used: number;
}

export interface LogsResponse {
  logs: UserLog[];
  total: number;
  page: number;
  limit: number;
}

export interface Transaction {
  timestamp: string;
  amount: number;
  credits: number;
  status: string;
  order_id: string;
  payment_id: string | null;
  completed_at: string | null;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Get User Logs
 * GET /api/logs?page=1&limit=20
 * Returns user activity logs with pagination
 */
export const getUserLogs = async (page: number = 1, limit: number = 20): Promise<LogsResponse> => {
  return apiRequest<LogsResponse>(`/api/logs?page=${page}&limit=${limit}`, {
    method: 'GET',
  });
};

/**
 * Get User Transactions
 * GET /api/get_transactions?page=1&limit=20
 * Returns user transaction history with pagination
 */
export const getUserTransactions = async (page: number = 1, limit: number = 20, status?: string): Promise<TransactionsResponse> => {
  const statusParam = status ? `&status=${status}` : '';
  return apiRequest<TransactionsResponse>(`/api/get_transactions?page=${page}&limit=${limit}${statusParam}`, {
    method: 'GET',
  });
};

// ==================== KYC/VERIFICATION API ====================

export interface VerificationRequest {
  id_number: string;
}

export interface GenericVerificationResponse {
  success: boolean;
  data: Record<string, any>;
  status_code: number;
  message: string | null;
  credit_details?: {
    user_price_deducted: number;
    base_price_deducted: number;
    company_profit_per_call: number;
    user_remaining_credits: number;
    company_remaining_credits: number;
  };
}

/**
 * PAN Comprehensive Verification
 * POST /api/pan/pan-comprehensive
 * Returns detailed PAN information including Aadhaar linkage, address, etc.
 */
export const verifyPANComprehensive = async (
  panNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 PAN Comprehensive Verification:', {
    panNumber: panNumber.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/pan/pan-comprehensive', {
    method: 'POST',
    body: JSON.stringify({ id_number: panNumber }),
  });
};

/**
 * DIN (Director Identification Number) Verification
 * POST /api/corporate/din
 * Returns director details including name, DOB, address, email, companies associated
 */
export const verifyCorporateDIN = async (
  dinNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Corporate DIN Verification:', {
    dinNumber: dinNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/corporate/din', {
    method: 'POST',
    body: JSON.stringify({ id_number: dinNumber }),
  });
};

/**
 * Director Phone Number Lookup
 * POST /api/corporate/director-phone
 * Returns phone number associated with a DIN
 */
export const verifyDirectorPhone = async (
  dinNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Director Phone Verification:', {
    dinNumber: dinNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/corporate/director-phone', {
    method: 'POST',
    body: JSON.stringify({ id_number: dinNumber }),
  });
};

/**
 * GSTIN Advanced Verification
 * POST /api/corporate/gstin-advanced
 * Returns comprehensive GSTIN details including business info, promoters, turnover, address
 */
export const verifyGSTINAdvanced = async (
  gstinNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 GSTIN Advanced Verification:', {
    gstinNumber: gstinNumber.substring(0, 5) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/corporate/gstin-advanced', {
    method: 'POST',
    body: JSON.stringify({ id_number: gstinNumber }),
  });
};

/**
 * Bank Verification by Mobile Number
 * POST /api/bank-verification/bank-verification-mobile
 * Returns bank account details linked to mobile number including IFSC details
 */
export const verifyBankByMobile = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Bank Verification by Mobile:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/bank-verification/bank-verification-mobile', {
    method: 'POST',
    body: JSON.stringify({ mobile_number: mobileNumber }),
  });
};

/**
 * RC Full Details Verification
 * POST /api/rc/rc-full
 * Returns comprehensive vehicle registration details including owner info, vehicle specs, insurance, permits
 */
export const verifyRCFull = async (
  rcNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 RC Full Verification:', {
    rcNumber: rcNumber.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/rc/rc-full', {
    method: 'POST',
    body: JSON.stringify({ id_number: rcNumber }),
  });
};

/**
 * RC to Mobile Number Lookup
 * POST /api/rc/rc-to-mobile-number
 * Returns mobile number linked to a vehicle RC number
 */
export const verifyRCToMobile = async (
  rcNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 RC to Mobile Verification:', {
    rcNumber: rcNumber.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/rc/rc-to-mobile-number', {
    method: 'POST',
    body: JSON.stringify({ rc_number: rcNumber }),
  });
};

/**
 * Chassis to RC Details Lookup
 * POST /api/rc/chassis-to-rc
 * Returns complete vehicle registration details from chassis number
 */
export const verifyChassisToRC = async (
  chassisNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Chassis to RC Verification:', {
    chassisNumber: chassisNumber.substring(0, 6) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/rc/chassis-to-rc', {
    method: 'POST',
    body: JSON.stringify({ vehicle_chasi_number: chassisNumber }),
  });
};

/**
 * Mobile to RC Lookup
 * POST /api/rc/mobile-number-to-rc
 * Returns RC numbers linked to a mobile number
 */
export const verifyMobileToRC = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile to RC Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/rc/mobile-number-to-rc', {
    method: 'POST',
    body: JSON.stringify({ mobile_number: mobileNumber }),
  });
};

/**
 * FASTag to RC Lookup
 * POST /api/fastag/tag-to-rc
 * Returns RC details for a given FASTag ID
 */
export const verifyFASTagToRC = async (
  tagId: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 FASTag to RC Verification:', {
    tagId: tagId.substring(0, 8) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/fastag/tag-to-rc', {
    method: 'POST',
    body: JSON.stringify({ tag_id: tagId }),
  });
};

/**
 * Voter ID Verification
 * POST /api/voter-id
 * Returns comprehensive voter information
 */
export const verifyVoterID = async (
  voterId: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Voter ID Verification:', {
    voterId: voterId.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/voter-id', {
    method: 'POST',
    body: JSON.stringify({ voter_id: voterId }),
  });
};

/**
 * Driving License Verification
 * POST /api/driving-license/driving-license
 * Returns comprehensive driving license information
 */
export const verifyDrivingLicense = async (
  licenseNumber: string,
  dob: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Driving License Verification:', {
    licenseNumber: licenseNumber.substring(0, 6) + '****',
    dob: dob.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/driving-license/driving-license', {
    method: 'POST',
    body: JSON.stringify({ id_number: licenseNumber, dob }),
  });
};

/**
 * Mobile Intelligence
 * POST /api/prefill/prefill-by-mobile
 * Returns comprehensive mobile intelligence data including personal info, addresses, emails, and identity documents
 */
export const verifyMobileIntelligence = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile Intelligence Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/prefill/prefill-by-mobile', {
    method: 'POST',
    body: JSON.stringify({ mobile: mobileNumber }),
  });
};

/**
 * Mobile To Address
 * POST /api/mobile-to-address
 * Returns delivery addresses linked to a mobile number
 */
export const verifyMobileToAddress = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile to Address Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/mobile-to-address', {
    method: 'POST',
    body: JSON.stringify({ mobile_number: mobileNumber }),
  });
};

/**
 * Aadhaar Family Members
 * POST /api/aadhaar/family-members
 * Returns family members linked to an Aadhaar number
 * Note: This API can be slow, so we add retry logic
 */
export const verifyAadhaarFamilyMembers = async (
  aadhaarNumber: string,
  retryCount = 0
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Aadhaar Family Members Verification:', {
    aadhaarNumber: aadhaarNumber.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
    attempt: retryCount + 1,
  });

  try {
    return await apiRequest<GenericVerificationResponse>('/api/aadhaar/family-members', {
      method: 'POST',
      body: JSON.stringify({ aadhaar: aadhaarNumber }),
    });
  } catch (error: any) {
    // Retry on timeout (up to 2 retries = 3 total attempts)
    if (error.message.includes('Timeout') && retryCount < 2) {
      console.log(`⏱️ Timeout detected, retrying... (attempt ${retryCount + 2}/3)`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
      return verifyAadhaarFamilyMembers(aadhaarNumber, retryCount + 1);
    }
    throw error;
  }
};

/**
 * FamPay UPI to Mobile
 * POST /api/fampay/upi-to-mobile
 * Returns mobile number linked to a FamPay UPI ID
 */
export const verifyFamPayUPIToMobile = async (
  upiId: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 FamPay UPI to Mobile Verification:', {
    upiId: upiId.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/fampay/upi-to-mobile', {
    method: 'POST',
    body: JSON.stringify({ fam_id: upiId }),
  });
};

/**
 * GSTIN Search by Company Name
 * POST /api/gstin/search-by-company-name
 * Returns GSTIN details for a company name
 */
export const verifyGSTINByCompanyName = async (
  companyName: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 GSTIN Search by Company Name:', {
    companyName: companyName.substring(0, 10) + '...',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/gstin/search-by-company-name', {
    method: 'POST',
    body: JSON.stringify({ company_name: companyName }),
  });
};

/**
 * GSTIN Search by PAN
 * POST /api/gstin/search-by-pan
 * Returns all GSTIN numbers linked to a PAN
 */
export const verifyGSTINByPAN = async (
  panNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 GSTIN Search by PAN:', {
    panNumber: panNumber.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/gstin/search-by-pan', {
    method: 'POST',
    // Backend contract expects `pan` (not `pan_number`)
    body: JSON.stringify({ pan: panNumber }),
  });
};

/**
 * RC to FASTag
 * POST /api/fastag/rc-to-tag
 * Returns FASTag details for an RC number
 * Note: This API can be slow, so we add retry logic and extended timeout
 */
export const verifyRCToFASTag = async (
  rcNumber: string,
  retryCount = 0
): Promise<GenericVerificationResponse> => {
  console.log('🔍 RC to FASTag Verification:', {
    rcNumber: rcNumber.substring(0, 6) + '****',
    timestamp: new Date().toISOString(),
    attempt: retryCount + 1,
  });

  try {
    // Create an AbortController with extended timeout for this slow API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000); // 40 second timeout

    const response = await apiRequest<GenericVerificationResponse>('/api/fastag/rc-to-tag', {
      method: 'POST',
      body: JSON.stringify({ rc_number: rcNumber }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    // Retry on timeout (up to 2 retries = 3 total attempts)
    if (error.message.includes('Timeout') && retryCount < 2) {
      console.log(`⏱️ Timeout detected, retrying... (attempt ${retryCount + 2}/3)`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
      return verifyRCToFASTag(rcNumber, retryCount + 1);
    }
    throw error;
  }
};

/**
 * Mobile to Multiple UPI
 * POST /bank-verification/mobile-to-multiple-upi
 * Returns multiple UPI IDs linked to a mobile number
 */
export const verifyMobileToMultipleUPI = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile to Multiple UPI Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/bank-verification/mobile-to-multiple-upi', {
    method: 'POST',
    body: JSON.stringify({ mobile_number: mobileNumber }),
  });
};

/**
 * Chassis to RC
 * POST /rc/chassis-to-rc-details
 * Returns RC details for a chassis number
 */
export const verifyChassisToRCDetails = async (
  chassisNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Chassis to RC Verification:', {
    chassisNumber: chassisNumber.substring(0, 6) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/rc/chassis-to-rc-details', {
    method: 'POST',
    body: JSON.stringify({ chassis_number: chassisNumber }),
  });
};

/**
 * Voter ID Text
 * POST /voter-id/voter-id-info
 * Returns voter ID information
 */
export const verifyVoterIDText = async (
  voterId: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Voter ID Text Verification:', {
    voterId: voterId.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/voter-id/voter-id-info', {
    method: 'POST',
    body: JSON.stringify({ id_number: voterId }),
  });
};

/**
 * CIN to PAN
 * POST /corporate/cin-to-pan
 * Returns PAN number for a CIN
 */
export const verifyCINToPAN = async (
  cinNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 CIN to PAN Verification:', {
    cinNumber: cinNumber.substring(0, 6) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/corporate/cin-to-pan', {
    method: 'POST',
    body: JSON.stringify({ cin_number: cinNumber }),
  });
};

/**
 * Mobile to UAN
 * POST /income/mobile-to-uan
 * Returns UAN (Universal Account Number) for a mobile number
 */
export const verifyMobileToUAN = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile to UAN Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/income/mobile-to-uan', {
    method: 'POST',
    body: JSON.stringify({ mobile_number: mobileNumber }),
  });
};

/**
 * Employment History UAN V2
 * POST /income/uan-to-employment-history
 * Returns employment history for a UAN
 */
export const verifyUANToEmploymentHistory = async (
  uan: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 UAN to Employment History Verification:', {
    uan: uan.substring(0, 4) + '****',
    endpoint: '/api/income/uan-to-employment-history',
    requestBody: { id_number: uan },
    timestamp: new Date().toISOString(),
  });

  const response = await apiRequest<GenericVerificationResponse>('/api/income/uan-to-employment-history', {
    method: 'POST',
    body: JSON.stringify({ id_number: uan }),
  });

  console.log('✅ UAN Employment History Response:', {
    success: response.success,
    status_code: response.status_code,
    hasData: !!response.data,
    hasEmploymentHistory: !!response.data?.employment_history,
    creditDetails: response.credit_details,
  });

  return response;
};

/**
 * PAN to UAN
 * POST /pan/pan-to-uan
 * Returns UAN for a PAN number
 */
export const verifyPANToUAN = async (
  panNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 PAN to UAN Verification:', {
    panNumber: panNumber.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/pan/pan-to-uan', {
    method: 'POST',
    body: JSON.stringify({ pan_number: panNumber }),
  });
};

/**
 * RC Owner History
 * POST /rc/rc-owner-history
 * Returns ownership history for an RC number
 */
export const verifyRCOwnerHistory = async (
  rcNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 RC Owner History Verification:', {
    rcNumber: rcNumber.substring(0, 4) + '****',
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/rc/rc-owner-history', {
    method: 'POST',
    body: JSON.stringify({ id_number: rcNumber }),
  });
};

/**
 * Mobile to GAS Connection
 * POST /gas-connection/verify
 * Returns gas connection details for a mobile number
 * Requires mobile_number and provider_name (e.g., "Indane", "HP Gas", "Bharat Gas")
 */
export const verifyMobileToGAS = async (
  mobileNumber: string,
  providerName: string = "Indane"
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile to GAS Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    provider: providerName,
    timestamp: new Date().toISOString(),
  });

  return apiRequest<GenericVerificationResponse>('/api/gas-connection/verify', {
    method: 'POST',
    body: JSON.stringify({ 
      mobile_number: mobileNumber,
      provider_name: providerName 
    }),
  });
};

/**
 * Health Check
 * GET /api/health/
 * Returns the health status of all APIs
 */
export interface HealthCheckResponse {
  status: 'ok' | 'down' | 'partial';
  message: string;
  apis?: string[]; // List of down APIs if status is 'partial'
}

export const getHealthStatus = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/health/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    // Handle different response formats
    if (data.status === 'ok') {
      return { status: 'ok', message: data.message || 'All systems operational' };
    } else if (data.status === 'down') {
      return { status: 'down', message: data.message || 'APIs are down', apis: [] };
    } else if (data.apis && Array.isArray(data.apis)) {
      return { status: 'partial', message: data.message || 'Some APIs are down', apis: data.apis };
    } else {
      return { status: 'ok', message: 'System operational' };
    }
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'down', message: 'Unable to check system health', apis: [] };
  }
};

/**
 * Mobile to PAN
 * POST /bank-verification/mobile-to-pan
 * Returns PAN details linked to a mobile number
 */
export const verifyMobileToPAN = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile to PAN Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    endpoint: '/api/bank-verification/mobile-to-pan',
    timestamp: new Date().toISOString(),
  });

  const response = await apiRequest<GenericVerificationResponse>('/api/bank-verification/mobile-to-pan', {
    method: 'POST',
    body: JSON.stringify({ mobile_number: mobileNumber }),
  });

  console.log('✅ Mobile to PAN Response:', {
    success: response.success,
    status_code: response.status_code,
    hasData: !!response.data,
  });

  return response;
};

/**
 * UPI to Bank Details
 * POST /bank-verification/upi-to-bank-details
 * Returns bank account details linked to a UPI ID
 */
export const verifyUPIToBankDetails = async (
  upiId: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 UPI to Bank Details Verification:', {
    upiId: upiId.substring(0, 4) + '****',
    endpoint: '/api/bank-verification/upi-to-bank-details',
    timestamp: new Date().toISOString(),
  });

  const response = await apiRequest<GenericVerificationResponse>('/api/bank-verification/upi-to-bank-details', {
    method: 'POST',
    body: JSON.stringify({ upi_id: upiId }),
  });

  console.log('✅ UPI to Bank Details Response:', {
    success: response.success,
    status_code: response.status_code,
    hasData: !!response.data,
  });

  return response;
};

/**
 * Mobile to Address (Enhanced)
 * POST /address/mobile-to-address
 * Returns address details linked to a mobile number
 * Note: This API has a different response format that needs transformation
 */
export const verifyMobileToAddressEnhanced = async (
  mobileNumber: string
): Promise<GenericVerificationResponse> => {
  console.log('🔍 Mobile to Address Enhanced Verification:', {
    mobileNumber: mobileNumber.substring(0, 3) + '****',
    endpoint: '/api/address/mobile-to-address',
    timestamp: new Date().toISOString(),
  });

  const response = await apiRequest<GenericVerificationResponse>('/api/address/mobile-to-address', {
    method: 'POST',
    body: JSON.stringify({ mobile: mobileNumber }),
  });

  console.log('✅ Mobile to Address Enhanced Response:', {
    success: response.success,
    status_code: response.status_code,
    hasData: !!response.data,
  });

  return response;
};
