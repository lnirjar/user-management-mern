import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { authActions } from "../redux/authSlice";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = async () => {
    const data = await axios.get("/api/auth/logout");
    console.log(data);
    dispatch(authActions.setUser(null));
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
