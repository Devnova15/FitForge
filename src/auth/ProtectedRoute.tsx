import { ROUTS } from "@/routes/routes";
import {Navigate} from "react-router";
import { Layout } from "@/components/Layout";

export const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={ROUTS.LOGIN} replace />;
    }

    return <Layout />;
};
