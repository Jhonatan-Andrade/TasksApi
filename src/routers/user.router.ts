import { FastifyInstance} from "fastify";
import { UserUseCase } from "../useCases/user.usecase";
import { UserCreate, UserLogin, UserUpdate } from "../interfaces/user.interface";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export async function UserRouter(app: FastifyInstance) {

    const userUseCase = new UserUseCase()

    app.post<{ Body: UserCreate }>('/user/signup', async (req, reply) => {
      const { name, email, password} = req.body;
      try {
        const created = await userUseCase.create({
          name,
          email,
          password,
        });
        return reply.send(created);
      } catch (error) {
        reply.send(error);
      }
    });
    app.post<{ Body: UserLogin }>('/user/signin', async (req, reply) => {
      const { email, password} = req.body;
      try {
        const token = await userUseCase.login({email,password});
        return reply.send(token);
      } catch (error) {
        reply.send(error);
      }
    });
    app.put<{Params:{email:string} ,Body: UserUpdate }>('/user/editProfile',{preHandler:isAuthenticated}, async (req, reply) => {
      const { name, password } = req.body;
      const { email }= req.params
      try {
        const data = await userUseCase.update({ name,email,password,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }); 
    app.get<{Params:{email:string}}>('/user',{preHandler:isAuthenticated}, async (req, reply) => {
      const {email} = req.params 
      try {
        const user = await userUseCase.findByEmail(email);
        return reply.send(user);
      } catch (error) {
        reply.send(error);
      }
    });
}