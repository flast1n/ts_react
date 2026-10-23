export type Task = {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
  category: "Work" | "Study" | "Personal";
  isCompleted: boolean;
}