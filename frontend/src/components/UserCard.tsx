import { Link } from "react-router-dom";
import type { User } from "../constants";

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="space-y-2 border p-4">
      <div className="font-bold">
        {user.name} ({user.role})
      </div>
      <div>{user.email}</div>
      <Link
        to={`/users/${user._id.toString()}/tasks`}
        className="bg-gray-200 text-black p-2 rounded-sm cursor-pointer"
      >
        View tasks
      </Link>
    </div>
  );
};
