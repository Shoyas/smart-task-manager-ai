'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Popover } from '@radix-ui/react-popover';
import { Label } from './ui/label';
import { PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Textarea } from './ui/textarea';
import { Task } from '@/types/task';
import { Calendar } from './ui/calendar';

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
}

const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate?.toISOString(),
        status: 'pending',
        subtasks: [],
      });
      setTitle('');
      setDescription('');
      setDueDate(undefined);
    } catch (error) {
      console.error('Adding task error:', error);
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            placeholder="Enter task title"
            className="bg-gray-100 text-gray-900"
            required
          />
        </div>

        <div className='space-y-2'>
          <Label>Due Date</Label>
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn('w-full justify-start text-left font-normal', !dueDate && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={(e) => {
                  setDueDate(e)
                  setOpen(false)
                }}
                initialFocus
                required
              />
            </PopoverContent>

          </Popover>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="bg-gray-100 text-gray-900"
          rows={3}
        />
      </div>

      <Button
        type='submit'
        disabled={isSubmitting || !title.trim() || !dueDate}
        className='w-full bg-blue-400 hover:bg-blue-500 text-white'
      >
        <Plus className='mr-2 h-4 w-4' />
        {isSubmitting ? 'Adding Task...' : 'Add Task'}
      </Button>
    </form>
  );
};

export default AddTaskForm;