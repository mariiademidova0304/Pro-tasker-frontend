import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from "../context/ContextAPI";
import { useContext } from "react";

export default function ProtectedRoutes() {
    const { jwt } = useContext(CurrentUserContext);

    return jwt ? <Outlet /> : <Navigate to='/' replace/>
}
