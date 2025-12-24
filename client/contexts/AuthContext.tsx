import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, setAuthToken, removeAuthToken, getAuthToken } from '@/lib/apiClient';

// User type definition
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  credits: number;
  role?: string;
  phone?: string;
}

// Demo user credentials
const DEMO_USERS = {
  'demo@police.gov.in': {
    password: 'demo123',
    user: {
      id: 1,
      username: 'demo@police.gov.in',
      email: 'demo@police.gov.in',
      first_name: 'Demo',
      last_name: 'Officer',
      is_verified: true,
      credits: 250,
      role: 'user',
      phone: '+91 98765 43210',
    },
  },
  'admin@police.gov.in': {
    password: 'admin123',
    user: {
      id: 2,
      username: 'admin@police.gov.in',
      email: 'admin@police.gov.in',
      first_name: 'Admin',
      last_name: 'User',
      is_verified: true,
      credits: 1000,
      role: 'admin',
      phone: '+91 98765 00000',
    },
  },
};

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoUser: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = () => {
      const token = getAuthToken();
      const savedUser = localStorage.getItem('user');
      const savedIsDemoUser = localStorage.getItem('isDemoUser') === 'true';
      
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsDemoUser(savedIsDemoUser);
        } catch (error) {
          console.error('Failed to parse saved user:', error);
          removeAuthToken();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function with demo user support
  const login = async (username: string, password: string) => {
    try {
      // Check if it's a demo user first
      const demoUser = DEMO_USERS[username as keyof typeof DEMO_USERS];
      
      if (demoUser && demoUser.password === password) {
        // Mock demo authentication
        const mockToken = `demo-token-${Date.now()}`;
        setAuthToken(mockToken);
        setUser(demoUser.user);
        setIsDemoUser(true);
        localStorage.setItem('user', JSON.stringify(demoUser.user));
        localStorage.setItem('isDemoUser', 'true');
        console.log('✅ Demo user logged in:', username);
        return;
      }

      // Otherwise, try real API authentication
      console.log('Attempting real API login for:', username);
      const response = await authAPI.login({ username, password });
      
      // Save token
      setAuthToken(response.token);
      
      // Create user object
      const userData: User = {
        id: response.user_id,
        username: response.username,
        email: response.email,
        first_name: response.first_name,
        last_name: response.last_name,
        is_verified: response.is_verified,
        credits: response.credits,
        role: 'user',
      };
      
      // Save user to state and localStorage
      setUser(userData);
      setIsDemoUser(false);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isDemoUser', 'false');
      console.log('✅ Real API user logged in:', username);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Invalid credentials');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Only call API logout if not a demo user
      if (!isDemoUser) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      setUser(null);
      setIsDemoUser(false);
      removeAuthToken();
      localStorage.removeItem('isDemoUser');
    }
  };

  // Update user function (for profile updates, credit changes, etc.)
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isDemoUser,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
