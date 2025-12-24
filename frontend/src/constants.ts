export type Task = { title: string; description?: string; _id: string };

export type User = {
  name: string;
  email: string;
  _id: string;
  role: "admin" | "member";
};
