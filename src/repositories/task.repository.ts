
import { prisma } from "../dataBase/prisma.client";
import { TaskList, Task, TaskRepository, TaskUpdate, TaskCreateDB } from "../interfaces/task.interface";

export class TaskRepositoryDb implements TaskRepository {


    async create(task: TaskCreateDB): Promise<Task> {
        const taskCreated = await prisma.task.create({
            data: task,
        });
        if (!taskCreated) throw new Error("Erro ao criar tarefa");
        return taskCreated;
    }
    async findById(id: string): Promise<Task | null> {
        const taskFindById = await prisma.task.findUnique({
            where: {
                id,
            },
        });
    
        return taskFindById || null;
    }
    async findByAll(userId:string): Promise<TaskList[]> {
        const list = await prisma.task.findMany({
            where: {
                userId,
            },   
        })
        return list;
    }

    async update(task: TaskUpdate): Promise<Task> {
        const taskUpdated = await prisma.task.update({
            where: {
                id:task.id,
            },
            data: task,
        });
        if (!taskUpdated) throw new Error("Erro ao atualizar tarefa");
        return taskUpdated;
    }

    async delete(id: string): Promise<boolean> {
        const taskDelete = await prisma.task.delete({
            where: {
                id,
            },
        });
        if (!taskDelete) throw new Error("Erro ao deletar tarefa");
        return true;
    }
}