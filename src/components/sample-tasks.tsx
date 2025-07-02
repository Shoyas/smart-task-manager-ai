export const sampleTasks = [
  {
    id: "sample-1",
    title: "Prepare for job interview",
    description: "Technical interview for React developer position at a tech startup",
    status: "pending" as const,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    createdAt: new Date().toISOString(),
    subtasks: [],
  },
  {
    id: "sample-2",
    title: "Plan birthday party",
    description: "Organize a surprise birthday party for my friend's 30th birthday",
    status: "pending" as const,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    createdAt: new Date().toISOString(),
    subtasks: [],
  },
  {
    id: "sample-3",
    title: "Learn Next.js",
    description: "Master Next.js framework for building modern web applications",
    status: "pending" as const,
    createdAt: new Date().toISOString(),
    subtasks: [],
  },
]