export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: Date;
  subTask?: string[];
  createdAt: Date;
  updatedAt: Date;
}