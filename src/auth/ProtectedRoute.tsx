// import { ROUTS } from "@/routes/routes";
import {Outlet} from "react-router";

export const ProtectedRoute = () => {
    // const token = localStorage.getItem("token");
    //
    // if (!token) {
    //     return <Navigate to={ROUTS.LOGIN} replace />;
    // }

    return <Outlet />;
};
