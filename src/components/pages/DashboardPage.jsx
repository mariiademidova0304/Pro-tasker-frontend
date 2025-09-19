import { useContext } from "react";
import { CurrentUserContext } from "../../context/ContextAPI";

export default function DashBoardPage() {
    const { jwt, logout } = useContext(CurrentUserContext);

    return (
        <p>Current JWT: {jwt}</p>
    )
}