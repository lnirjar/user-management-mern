import { useState } from "react";
import { FormField } from "./FormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.post("/api/tasks", {
      title,
      description,
    });
    console.log(data);

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-96">
        <h1 className="text-4xl font-bold">Create Task Form</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4 my-4">
            <FormField label="Title" value={title} setValue={setTitle} />
            <FormField
              label="Description"
              value={description}
              setValue={setDescription}
            />
            <button
              className="bg-gray-800 text-white p-2 rounded-sm"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
