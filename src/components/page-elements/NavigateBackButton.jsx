import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

//button that navigates to previous page when clicked
export default function NavigateBackButton() {
 const navigate = useNavigate();

    return <Button variant="outline-primary" onClick={() => navigate(-1)}>Go Back</Button>
}