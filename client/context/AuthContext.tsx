import React, { createContext, useState, useEffect, ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { loginService, logoutService } from "../service/login";
import { saveToken, getToken, deleteToken, saveUserData, getUserData, deleteUserData } from "../utils/storage";

type User = {
    token: string;
    user: {
        _id: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        role: string;
    };
} | null;

interface AuthContextType {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await getToken();
            const userData = await getUserData();
            if (token && userData) {
                setUser({ token, user: userData });
            }
            setLoading(false);
        };
        checkLoginStatus();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await loginService({ email, password });
            if (response.token && response.user) {
                await saveToken(response.token);
                await saveUserData(response.user);
                setUser({ token: response.token, user: response.user });
            } else {
                throw new Error('Login failed: No token or user data received');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutService();
            await deleteToken();
            await deleteUserData();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    if (loading) return <View><ActivityIndicator size="large" /></View>;

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};