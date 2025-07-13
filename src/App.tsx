import Home from "@/pages/Home/Home.tsx";
import LoginPage from "@/pages/Login/Login.tsx";
import {Route, Routes} from "react-router";
import {ToastContainer} from "react-toastify";
import {ROUTS} from "@/routes/routes.tsx";
import RegisterPage from "@/pages/Register/Register.tsx";

export function App () {
   return (
    <>

            <Routes>
                    <Route index path={ROUTS.HOME} element={<Home/>}/>
                    <Route path={ROUTS.LOGIN} element={<LoginPage/>}/>
                    <Route path={ROUTS.REGISTER} element={<RegisterPage/>}/>
            </Routes>
        <ToastContainer autoClose={1000}/>
    </>
   )
}
