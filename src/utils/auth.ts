import axiosInstance from '@/setup/axios';
export const getNewAccessToken = async () => {
    try {
        const response = await axiosInstance.get(`/auth/refresh-token`)
        const newAccessToken = response.data?.access_token
        if (!newAccessToken) throw new Error("Access token not found")
        return newAccessToken
    } catch (error) {
        throw error
    }
}
export const checkValidAccessToken = async () => {
    try {
        const response = await axiosInstance.get(`/auth/check-auth`);
        return response.data?.isAuthenticated;
    } catch(error){
        console.log(error);
        return false;
    }
}