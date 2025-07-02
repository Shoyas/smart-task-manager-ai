'use client';


import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const TaskManager = () => {


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <h1>This is Task Form Component</h1>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskManager;