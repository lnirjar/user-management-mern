import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();

  const onClick = async () => {
    const data = await axios.get("/api/logout");
    console.log(data);
    onLogout();
    navigate("/login");
  };

  return (
    <div>
      <button
        className="bg-red-400 text-black p-2 rounded-sm cursor-pointer"
        onClick={() => onClick()}
      >
        Logout
      </button>
    </div>
  );
};
