import { useState } from "react";
import { FormField } from "./FormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    console.log(data);

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-96">
        <h1 className="text-4xl font-bold">Register</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4 my-4">
            <FormField label="Name" value={name} setValue={setName} />
            <FormField label="Email" value={email} setValue={setEmail} />
            <FormField
              label="Password"
              value={password}
              setValue={setPassword}
            />
            <button
              className="bg-gray-800 text-white p-2 rounded-sm"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
