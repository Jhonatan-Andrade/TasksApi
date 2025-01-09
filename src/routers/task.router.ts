import { FastifyInstance} from "fastify";
import { TaskUseCase } from "../useCases/task.usecase";
import {  TaskCreate, TaskUpdate } from "../interfaces/task.interface";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export async function TaskRouter(app: FastifyInstance) {

    const taskUseCase = new TaskUseCase()

    app.post<{  Params: { email: string } , Body: TaskCreate, }>('/task',{preHandler:isAuthenticated}, async (req, reply) => {
      const { title,description,date} = req.body;
      const {email} = req.params;
      try {
        const data = await taskUseCase.create(email,{title,description,date});
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    app.get<{ Params: {email:string} }>('/task',{preHandler:isAuthenticated}, async (req, reply) => {
      const { email } = req.params;
      try {
        const data = await taskUseCase.findByTaskList(email);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    app.put<{  Params: { email: string } , Body: TaskUpdate }>('/task', {preHandler:isAuthenticated} ,async (req, reply) => {
      try {
        const dataBody = req.body;
        const {email} = req.params;
        const data = await taskUseCase.taskUpdate(email,dataBody);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });  
    app.delete<{  Params: { email: string } , Body: {id:string} }>('/task', {preHandler:isAuthenticated} ,async (req, reply) => {
      try {
        const {id} = req.body;
        const {email} = req.params;
        const data = await taskUseCase.delete(id,email);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });  
}