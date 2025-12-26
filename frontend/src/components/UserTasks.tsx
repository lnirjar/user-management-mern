import axios from "axios";
import { useEffect, useState } from "react";
import type { Task, User } from "../constants";
import { TaskCard } from "./TaskCard";
import { useParams } from "react-router-dom";

export const UserTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User>();
  const [tasksLoading, setTasksLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await axios.get(`/api/admin/users/${userId}/tasks`);
      setTasks(data.data.tasks);
      setUser(data.data.user);
      setTasksLoading(false);
    };
    fetchTasks();
  }, [userId]);

  if (tasksLoading) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-xl space-y-4">
        <h2 className="text-2xl font-bold">
          Tasks for {user?.name} ({user?.role})
        </h2>
        <div className="pb-10 space-y-4">
          {tasks?.map((task) => (
            <TaskCard
              key={task._id.toString()}
              task={task}
              hideEditButton={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
