/**
 * API Client for backend communication
 * Handles HTTP requests, token management, and error handling
 */

const BASE_URL = 'https://new-cybershastra.onrender.com';

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

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  // Handle errors
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

// ==================== TYPE DEFINITIONS ====================

export interface RegisterData {
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
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  credits: number;
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
