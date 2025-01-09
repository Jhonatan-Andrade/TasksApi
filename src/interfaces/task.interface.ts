
export interface TaskCreateDB extends TaskCreate {
    userId: string;
    taskStatus: string;
}
export interface TaskCreate {
    title: string;
    description: string;
    date: string;
}

export interface Task{
    id: string;
    title: string;
    description: string;
    date: string;
    taskStatus: string;
    userId: string;
}
export interface TaskUpdate {
    id: string;
    title?: string;
    description?: string;
    date?: string;
    taskStatus?: string;
}
export interface TaskList {
    id: string;
    title: string;
    description: string;
    date: string;
    taskStatus:string;
    userId: string;
}
export interface StatusList {
    toDo:Task[],
    inProgress:Task[],
    completed:Task[],
    notCompleted:Task[]
}

 export interface TaskRepository {
    create(task: TaskCreateDB): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findByAll(userId:string): Promise<TaskList[]>;
    update(task: TaskUpdate): Promise<Task>;
    delete(id: string): Promise<boolean>;
 }