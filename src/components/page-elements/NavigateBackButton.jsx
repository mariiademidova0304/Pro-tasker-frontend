import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function NavigateBackButton() {
 const navigate = useNavigate();

    return <Button onClick={() => navigate(-1)}>Go Back</Button>
}