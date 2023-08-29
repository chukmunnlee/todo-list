export interface Task {
  task: string
  priority: string
}

export interface Todo {
  id?: string
  date?: number
  title: string
  completeBy: number
  tasks: Task[]
}

export interface TodoSummary {
  id: string
  completeBy: number
  title: string
  tasksCount: number
}
