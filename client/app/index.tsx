import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
    const auth = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    type AuthType = { user: any } | null;
    const user = (auth as AuthType)?.user ?? null;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            if (user) {
                if (user.user.role === "CI") {
                    router.replace("/(tabCI)/HomeScreenCi");
                }
                else if (user.user.role === "MI") {
                    router.replace("/(tabMI)/HomeScreenMI");
                }
                else if (user.user.role === "Admin") {
                    router.replace("/(admin)/NewCiRequest");
                }
            } else {
                router.replace("/(auth)/LoginForm");
            }
        }
    }, [user, isMounted]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );
}