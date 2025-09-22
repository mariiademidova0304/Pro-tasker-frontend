import Button from "react-bootstrap/esm/Button";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/ContextAPI";
import { useNavigate } from "react-router-dom";

export default function LogoutButton(){
    const navigate = useNavigate();
    const { logout } = useContext(CurrentUserContext);

    const handleLogout = () => {
        logout();
        navigate('/')
    }
    
    return(
        <Button variant="outline-primary" onClick={handleLogout}>Log Out</Button>
    )
}