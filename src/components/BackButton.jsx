import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      buttonStyleType="btn1"
      padding="padding2"
    >
      &larr; BACK
    </Button>
  );
}

export default BackButton;
