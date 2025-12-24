import { useEffect, useState } from "react";
import { FormField } from "./FormField";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const data = await axios.get(`/api/tasks/${taskId}`);
      setTitle(data.data.task.title ?? "");
      setDescription(data.data.task.description ?? "");
    };
    fetchTask();
  }, [taskId]);

  const deleteTask = async () => {
    await axios.delete(`/api/tasks/${taskId}`);
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.patch(`/api/tasks/${taskId}`, {
      title,
      description,
    });
    console.log(data);

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-96">
        <h1 className="text-4xl font-bold">Edit Task Form</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4 my-4">
            <FormField label="Title" value={title} setValue={setTitle} />
            <FormField
              label="Description"
              value={description}
              setValue={setDescription}
            />
            <div className="flex justify-between items-center">
              <button
                className="bg-gray-800 text-white p-2 rounded-sm"
                type="submit"
              >
                Update
              </button>
              <button
                className="bg-red-600 text-white p-2 rounded-sm"
                type="button"
                onClick={() => deleteTask()}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
