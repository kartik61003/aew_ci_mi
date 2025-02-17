import * as SecureStore from "expo-secure-store";

export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync("jwtToken", token);
};

export const getToken = async () => {
    return await SecureStore.getItemAsync("jwtToken");
};

export const deleteToken = async () => {
    await SecureStore.deleteItemAsync("jwtToken");
};

export const saveUserData = async (user: {_id: string; username: string; phone: string; email: string; password: string; role: string }) => {
    await SecureStore.setItemAsync("userData", JSON.stringify(user));
};

export const getUserData = async () => {
    const userData = await SecureStore.getItemAsync("userData");
    return userData ? JSON.parse(userData) : null;
};

export const deleteUserData = async () => {
    await SecureStore.deleteItemAsync("userData");
};