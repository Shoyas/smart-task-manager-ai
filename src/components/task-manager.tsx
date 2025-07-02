'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Task } from '@/types/task';
import { Button } from './ui/button';
import AddTaskForm from './add-task-form';
import { sampleTasks } from './sample-tasks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import TaskList from './task-list';


const TaskManager = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('smart-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error for saving tasks:', error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('smart-tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }


  const loadSampleTasks = () => {
    const existingIds = new Set(tasks.map((task) => task.id));
    const newSampleTasks = sampleTasks.filter((task) => !existingIds.has(task.id));
    if (newSampleTasks.length > 0) {
      setTasks((prevTasks) => [...prevTasks, ...newSampleTasks]);
    }
  }

  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <div className='space-y-6 mt-5'>
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTaskForm onAddTask={addTask} />
          {
            tasks.length === 0 && (
              <div className='mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4'>
                <p className='text-sm text-blue-700'>Hello! You have no tasks</p>
                <p className='text-sm text-blue-700'>Try the AI-powered subtask suggestions with some sample tasks</p>
                <Button
                  onClick={loadSampleTasks}
                  variant={'outline'}
                  size={'sm'}
                  className='bg-blue-400 text-white hover:bg-blue-200'
                >Load Sample Tasks</Button>
              </div>
            )
          }
        </CardContent>
      </Card>

      <Tabs defaultValue='pending' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 gap-4'>
          <TabsTrigger value='pending' className='flex item-center gap-2'>Pending Tasks
            <Badge variant="secondary">
              {pendingTasks.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value='completed' className='flex item-center gap-2'>Complete Tasks
            <Badge variant="secondary">
              {completedTasks.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='pending' className='mt-6'>
          <TaskList
            tasks={pendingTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </TabsContent>

        <TabsContent value='completed' className='mt-6'>
          <TaskList
            tasks={completedTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </TabsContent>

      </Tabs>


    </div>
  );
};

export default TaskManager;