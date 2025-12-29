/**
 * API Client for backend communication
 * Handles HTTP requests, token management, and error handling
 */

const BASE_URL = 'https://osint-ninja.vercel.app';

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

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Don't send Authorization header for login/register endpoints
  // These endpoints are used to GET a token, not authenticate with one
  const isAuthEndpoint = endpoint === '/api/login' || endpoint === '/api/register';
  
  // Add authorization header if token exists (but NOT for auth endpoints)
  if (token && !isAuthEndpoint) {
    headers['Authorization'] = `Token ${token}`;
  }

  // Debug logging
  console.log('🔍 API Request:', {
    url: `${BASE_URL}${endpoint}`,
    method: options.method || 'GET',
    body: options.body,
    headers
  });

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  // Debug logging
  console.log('📥 API Response:', {
    status: response.status,
    ok: response.ok,
    data
  });

  // Handle errors
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
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
}

export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  amount: number;
}

export interface VerifyPaymentResponse {
  message: string;
  payment_id: string;
  credits_added: number;
  new_balance: number;
}

/**
 * Create Razorpay order
 * Backend endpoint: POST /api/create-order
 * Status: ⚠️ NEEDS TO BE IMPLEMENTED
 */
export const createOrder = async (data: CreateOrderData): Promise<CreateOrderResponse> => {
  return apiRequest<CreateOrderResponse>('/api/create-order', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Verify Razorpay payment and add credits
 * Backend endpoint: POST /api/verify-razorpay-payment
 * Status: ⚠️ NEEDS TO BE IMPLEMENTED
 */
export const verifyPayment = async (data: VerifyPaymentData): Promise<VerifyPaymentResponse> => {
  return apiRequest<VerifyPaymentResponse>('/api/verify-razorpay-payment', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
