import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
const isServer = typeof window === 'undefined';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_MODE === 'production' ? process.env.NEXT_PUBLIC_SERVER_PRODUCTION_URL : process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT_URL,
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    
  
  async (config: InternalAxiosRequestConfig) => {
    let token: string | undefined;

    if (isServer) {
      const { cookies } = await import('next/headers');
      // Server-side: Use Next.js cookies function
      const cookieStore = await cookies();
      token = cookieStore.get('access_token')?.value;
    } else {
      // Client-side: Use js-cookie
      token = Cookies.get('access_token');
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    console.log(response,"response");
    if (response.headers['refresh_token']) {
      const refreshToken = response.headers['refresh_token'];
      
      try {
        const decodedToken: { exp: number } = jwt_decode(refreshToken);
        const exp = decodedToken.exp;

        if (!isServer) {
          Cookies.set('refresh_token', refreshToken, { expires: new Date(exp * 1000) });
          console.log('Refresh token and expiration time set successfully on client');
        } else {
          const { serialize } = await import('cookie');
          const cookieString = serialize('refresh_token', refreshToken, { maxAge: exp * 1000, httpOnly: true });
          response.headers['Set-Cookie'] = cookieString;
          console.log('Refresh token set successfully on server');
        }
      } catch (error) {
        console.error('Error decoding refresh_token:', error);
      }
    }
    
    return response.data;
  },
  async (error: AxiosError) => {
    // if (error.response) {
    //   console.error('Response error:', error.response.data);
    //   console.error('Status:', error.response.status);
    // } else if (error.request) {
    //   console.error('Request error:', error.request);
    // } else {
    //   console.error('Error:', error.message);
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;

