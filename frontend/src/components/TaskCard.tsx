import { Link } from "react-router-dom";
import type { Task } from "../constants";

export const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="space-y-2 border p-4">
      <div className="font-bold">{task.title}</div>
      <div>{task.description}</div>
      <Link
        to={`/edit-task/${task._id.toString()}`}
        className="bg-gray-200 text-black p-2 rounded-sm cursor-pointer"
      >
        Edit
      </Link>
    </div>
  );
};
