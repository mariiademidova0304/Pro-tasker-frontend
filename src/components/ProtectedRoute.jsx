import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from "../context/ContextAPI";
import { useContext } from "react";

//setting up a guard that will navigate to / page if jwt is not provided
export default function ProtectedRoutes() {
    const { jwt } = useContext(CurrentUserContext);

    return jwt ? <Outlet /> : <Navigate to='/' replace/>
}
