import { StatusList, TaskList } from "../interfaces/task.interface";

export function organizeTaskList(list: TaskList[]) {
    
    // Organiza a lista de tarefas por status
    const toDo         = list.filter(item => item.taskStatus === "toDo")
    const inProgress   = list.filter(item => item.taskStatus === "inProgress")
    const completed    = list.filter(item => item.taskStatus === "completed")
    const notCompleted = list.filter(item => item.taskStatus === "notCompleted")
  
    const taskList:StatusList = {toDo,inProgress,completed,notCompleted}
    
    return taskList
}
