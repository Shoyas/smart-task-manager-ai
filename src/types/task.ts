export interface Subtask {
  id: string
  title: string
  completed: boolean
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "completed"
  dueDate?: string
  createdAt: string
  subtasks?: string[] | Subtask[]
}