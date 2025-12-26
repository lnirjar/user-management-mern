import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Navbar } from "./components/Navbar";
import { CreateTaskForm } from "./components/createTaskForm";
import { EditTaskForm } from "./components/EditTaskForm";
import { UserTasks } from "./components/UserTasks";

import { useUserDataQuery } from "./hooks/useUserDataQuery";

function App() {
  const { fetchData } = useUserDataQuery();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create-task" element={<CreateTaskForm />} />
        <Route path="/edit-task/:taskId" element={<EditTaskForm />} />
        <Route path="/users/:userId/tasks" element={<UserTasks />} />
      </Routes>
    </div>
  );
}

export default App;
