import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Navbar } from "./components/Navbar";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CreateTaskForm } from "./components/createTaskForm";
import { EditTaskForm } from "./components/EditTaskForm";
import { UserTasks } from "./components/UserTasks";

function App() {
  const [data, setData] = useState<{
    name: string;
    email: string;
    role: "admin" | "member";
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("/api/dashboard");
      setData(data?.data?.user ?? null);
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    const fetchData = async () => {
      const data = await axios.get("/api/dashboard");
      setData(data?.data?.user ?? null);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={!!data} onLogout={() => setData(null)} />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard data={data} loading={loading} fetchData={fetchData} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard data={data} loading={loading} fetchData={fetchData} />
          }
        />
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
