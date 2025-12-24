import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export const Navbar = ({
  isLoggedIn,
  onLogout,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  return (
    <div className="w-full p-4 flex justify-end items-center gap-4">
      {!isLoggedIn && (
        <>
          <Link
            to="/login"
            className="bg-gray-200 text-black p-2 rounded-sm cursor-pointer"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gray-800 text-white p-2 rounded-sm cursor-pointer"
          >
            Register
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/dashboard" className="p-2">
            Dashboard
          </Link>
          <Link
            to="/create-task"
            className="bg-gray-200 text-black p-2 rounded-sm cursor-pointer"
          >
            Create Task
          </Link>
          <LogoutButton onLogout={onLogout} />
        </>
      )}
    </div>
  );
};
