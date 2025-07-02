import { Task } from '@/types/task';
import React from 'react';
import TaskCard from './task-card';

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}



const TaskList = ({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) => {

  if (tasks.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-gray-400 text-lg mb-2'>
          <h2>No Tasks Found</h2>
        </div>
        <div className='text-gray-500 text-sm'>
          {
            tasks.length === 0 ? 'Add a new task to get started !' : 'All tasks completed !'
          }
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))
      }

    </div>
  )

};

export default TaskList;