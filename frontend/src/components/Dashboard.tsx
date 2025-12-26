import axios from "axios";
import { useEffect, useState } from "react";
import type { Task } from "../constants";
import { TaskCard } from "./TaskCard";
import { UsersList } from "./UsersList";
import { useAppSelector } from "../redux/hooks";
import { useUserDataQuery } from "../hooks/useUserDataQuery";

export const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  const { fetchData, loading } = useUserDataQuery();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await axios.get("/api/tasks/my");
      setTasks(data.data.tasks);
      setTasksLoading(false);
    };
    fetchTasks();
  }, []);

  if (loading || tasksLoading) {
    return <div>Loading ....</div>;
  }

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-xl space-y-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="space-y-2">
          <div>Name: {user?.name}</div>
          <div>Email: {user?.email}</div>
          <div>Role: {user?.role}</div>
        </div>

        <h2 className="text-2xl font-bold">My Tasks</h2>
        <div className="pb-10 space-y-4">
          {tasks?.map((task) => (
            <TaskCard key={task._id.toString()} task={task} />
          ))}
        </div>

        {user.role === "admin" && <UsersList />}
      </div>
    </div>
  );
};
