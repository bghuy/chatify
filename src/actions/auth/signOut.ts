import axiosInstance from "@/setup/axios";

export const signOut = async () => { 
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };