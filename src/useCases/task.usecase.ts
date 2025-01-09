import { Task, TaskCreate, TaskRepository, TaskUpdate, TaskList, StatusList } from "../interfaces/task.interface";

import { TaskRepositoryDb } from "../repositories/task.repository";
import { organizeTaskList } from "../scripts/organizeTaskList";
import { verifyTaskStatus } from "../scripts/verifyDifficultyAndTaskStatus";
import { verifyDate } from "../scripts/taskDelayChecker";
import { UserRepository } from "../interfaces/user.interface";
import { UserRepositoryDb } from "../repositories/user.repository";
import { log } from "console";

class TaskUseCase {
    private taskRepository: TaskRepository;
    private userRepository: UserRepository;
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.userRepository = new UserRepositoryDb();
    }
    async create(email:string,data: TaskCreate): Promise<Task> {
        const  {title,description,date} = data;

        if(!email) throw new Error("Usuario não autorizado ");

        // Validação dos dados
        if (!title || !description || !date ) {
            throw new Error("Dados invalidos")};
    
        // Buscando se o usuário existe
        const userData = await this.userRepository.findByEmail(email);
        if(userData.email !== email) throw new Error("Usuario não autorizado");
         

        // Verifica se a da tarefa e a data é válida
        verifyDate(date)
        
        const dataCreate = {title,description,date,taskStatus: "toDo",userId:userData.id}
      
        const taskCreated = await this.taskRepository.create(dataCreate);
        if (!taskCreated) throw new Error("Erro ao criar tarefa");
        
        return taskCreated;
    }

    async findByTaskList(email:string): Promise<StatusList>{
        
        if (!email) throw new Error("Usuario não autorizado 1 ");
     
        
        // Verifica se o filho existe
        const userExists = await this.userRepository.findByEmail(email);
        if (!userExists) throw new Error("Usuario não encontrado ");
        if (userExists.email !== email) throw new Error("Usuario não autorizado  ")
        
        // Verifica se a lista de tarefas existe
        const tasks = await this.taskRepository.findByAll(userExists.id);
        if (!tasks)  throw new Error("Lista de tarefas não encontrada");

        // Organiza a lista   aquivo do script/organizeTaskList.ts 
        const list = organizeTaskList(tasks);
    
        return list;
    }

    async taskUpdate(email:string,task: TaskUpdate): Promise<Task> {
  
        if(!email) throw new Error("Usuario não autorizado");
        
        // Validação dos dados
        if(!task.id) throw new Error("Dados invalidos");
        if(!task.title && !task.description && !task.date && !task.taskStatus) {
            throw new Error("algumas informações não foram preenchidas");}

        // Verifica se a data é válida
        if (task.date) {verifyDate(task.date)}

        if (task.taskStatus) {
            const verifyTaskStatus = ["inProgress","completed"].find(item => item === task.taskStatus);
            if(!verifyTaskStatus) throw new Error("Status não encontrado opsões: inProgress, completed");
        }

        // Verifica se a tarefa existe
        const verifyTask = await this.taskRepository.findById(task.id);
        if(!verifyTask) throw new Error("Task not found");

        // Busca o usuario dono da tarefa
        const verifyUser = await this.userRepository.findById(verifyTask.userId);
        if(!verifyUser) throw new Error("User not found");
        if(verifyUser.email !== email) throw new Error("Usuario não autorizado");

        // Atualiza a tarefa
        const taskUpdated = await this.taskRepository.update(task);
        return taskUpdated;
    }
    async delete(id: string,email:string): Promise<{message: string}> {

        if(!email) throw new Error("Usuario não autorizado");

        // Busca a lista de tarefas pelo id da tarefa
        const verifyTask = await this.taskRepository.findById(id);
        if(!verifyTask) throw new Error("Tarefa não encontrada");

        // Busca o usuario dono da tarefa
        const verifyUser = await this.userRepository.findById(verifyTask.userId);
        if(!verifyUser) throw new Error("User not found");
        if(verifyUser.email !== email) throw new Error("Usuario não autorizado");
        
        await this.taskRepository.delete(id);

        return  {message :'Tarefa deletada com sucesso'}
    }
}
export{ TaskUseCase }