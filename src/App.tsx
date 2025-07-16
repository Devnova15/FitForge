import Home from "@/pages/Home/Home.tsx";
import LoginPage from "@/pages/Login/Login.tsx";
import RegisterPage from "@/pages/Register/Register.tsx";
import Account from "@/pages/Account/Account.tsx";
import { ToastContainer } from "react-toastify";
import { ROUTS } from "@/routes/routes.tsx";
import { ProtectedRoute } from "@/auth/ProtectedRoute.tsx";
import {Route, Routes} from "react-router";

export function App() {
    return (
        <>
            <Routes>
                <Route path={ROUTS.LOGIN} element={<LoginPage />} />
                <Route path={ROUTS.REGISTER} element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTS.HOME} element={<Home />} />
                    <Route path={ROUTS.DASHBOARD} element={<div>Dashboard Page</div>} />
                    <Route path={ROUTS.PROFILE} element={<div>Profile Page</div>} />
                    <Route path={ROUTS.SETTINGS} element={<div>Settings Page</div>} />
                    <Route path={ROUTS.ACCOUNT} element={<Account />} />
                    <Route path={ROUTS.SAVED} element={<div>Saved Page</div>} />
                    <Route path={ROUTS.EDIT} element={<div>Edit Page</div>} />
                </Route>
            </Routes>

            <ToastContainer autoClose={1000} />
        </>
    );
}
