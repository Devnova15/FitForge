import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {Quries} from "@/api/quries.ts";

const BASE_API_URL = "http://localhost:4000"; 

export function useAuth() {
    const navigate = useNavigate();

    const register = useCallback(async (email: string, password: string) => {
        try {
            const response = await fetch(`${BASE_API_URL}${Quries.API.USERS.REGISTER}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });


            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Error during registration");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
        } catch (error) {
            throw error;
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            const response = await fetch(`${BASE_API_URL}${Quries.API.USERS.LOGIN}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });


            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Error logging in");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate(Quries.CLIENT.PROFILE.DASHBOARD);
        } catch (error) {
            throw error;
        }
    }, [navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        navigate(Quries.CLIENT.AUTH.LOGIN);
    }, [navigate]);

    const isAuthenticated = !!localStorage.getItem("token");

    return {
        register,
        login,
        logout,
        isAuthenticated,
    };
}
