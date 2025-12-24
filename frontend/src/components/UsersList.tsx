import { useEffect, useState } from "react";
import type { User } from "../constants";
import axios from "axios";
import { UserCard } from "./UserCard";

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await axios.get("/api/admin/users");
      setUsers(data.data.users);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="pb-10">
      <h2 className="text-2xl font-bold">Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <UserCard user={user} key={user._id.toString()} />
        ))}
      </div>
    </div>
  );
};
