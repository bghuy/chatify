import axios from "@/setup/axios";
export const checkAuth = async () => {
    try {
        const response = await axios.get("/auth/profile");
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.log("User not found!", error.message);
        } else {
            console.log("User not found!", "An unknown error occurred");
        }
    }
};

export const LoginByCredentials = async (email: string, password: string) => {
    try {
        const response = await axios.post("/auth/login", {
            email,
            password
        });
        return response.data;;
    } catch (error) {
      throw error;
    }
};

export const RegisterByCredentials = async (email: string, password: string, name: string) => {
    try {
        const response = await axios.post("/auth/register", {
            email,
            password,
            name
        });
        return response.data;;
    } catch (error) {
      throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axios.get("/auth/profile");
        return response.data;
    } catch (error) {
        return null;
        
        // throw error;
    }
};

export const LoginWithGoogle = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_MODE === 'production' ? process.env.NEXT_PUBLIC_SERVER_PRODUCTION_URL : process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT_URL
        window.location.href = `${baseUrl}/auth/google/login`;
    } catch (error) {
        console.log(error);
        return null;
    }
};

  