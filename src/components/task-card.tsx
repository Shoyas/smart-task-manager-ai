'use client';

import { Task } from "@/types/task"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { cn } from "@/lib/utils"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Edit, Trash2, Calendar, Loader2, Sparkles, ChevronUp, ChevronDown } from "lucide-react"
import { Badge } from "./ui/badge"
import { format } from "date-fns"
import EditTaskDialog from "./edit-task-dialog"

interface TaskCardProps {
  task: Task
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}

const TaskCard = ({ task, onUpdateTask, onDeleteTask }: TaskCardProps) => {

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [showSubtasks, setShowSubtasks] = useState(false)
  const [isGeneratingSubtasks, setIsGeneratingSubtasks] = useState(false)

  const handleStatusChange = (checked: boolean) => {
    onUpdateTask(task.id, {
      status: checked ? "completed" : "pending",
    })
  }

  const generateSubtasks = async () => {
    if (isGeneratingSubtasks) return

    setIsGeneratingSubtasks(true)

    try {
      const response = await fetch("/api/generate-subtasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate subtasks")
      }

      const data = await response.json()

      if (data.subtasks && data.subtasks.length > 0) {
        onUpdateTask(task.id, {
          subtasks: data.subtasks,
        })
        setShowSubtasks(true)
      } else {
        throw new Error("No subtasks generated")
      }
    } catch (error) {
      console.error("Error generating subtasks:", error)

      // Show a user-friendly error message
      alert("Failed to generate subtasks. Please check your internet connection and try again.")
    } finally {
      setIsGeneratingSubtasks(false)
    }
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === "pending"


  return (
    <>
      <Card
        className={cn(
          "transition-all duration-200 hover:shadow-md",
          task.status === "completed" && "opacity-75",
          isOverdue && "border-red-200 bg-red-50",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox checked={task.status === "completed"} onCheckedChange={handleStatusChange} className="mt-1" />
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    "font-semibold text-lg leading-tight",
                    task.status === "completed" && "line-through text-gray-500",
                  )}
                >
                  {task.title}
                </h3>
                {task.description && <p className="text-gray-600 text-sm mt-1 leading-relaxed">{task.description}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(true)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTask(task.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant={task.status === "completed" ? "default" : "secondary"}>{task.status}</Badge>

            {task.dueDate && (
              <Badge variant={isOverdue ? "destructive" : "outline"} className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(task.dueDate), "MMM dd, yyyy")}
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateSubtasks}
              disabled={isGeneratingSubtasks}
              className="flex items-center gap-2 bg-transparent"
            >
              {isGeneratingSubtasks ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isGeneratingSubtasks ? "Generating..." : "Suggest Subtasks"}
            </Button>

            {task.subtasks && task.subtasks.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="flex items-center gap-2"
              >
                {showSubtasks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {showSubtasks ? "Hide" : "Show"} Subtasks ({task.subtasks.length})
              </Button>
            )}
          </div>

          {showSubtasks && task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm text-gray-700 mb-3">AI Suggested Subtasks:</h4>
              <ul className="space-y-2">
                {task.subtasks.map((subtask, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600 font-medium mt-0.5">•</span>
                    <span className="text-gray-700">{subtask}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <EditTaskDialog task={task} open={isEditOpen} onOpenChange={setIsEditOpen} onUpdateTask={onUpdateTask} />
    </>
  )
}

export default TaskCard