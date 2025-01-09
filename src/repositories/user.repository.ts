import { prisma } from "../dataBase/prisma.client";
import { User, UserCreate, UserDB, UserRepository, UserUpdate } from "../interfaces/user.interface";

export class UserRepositoryDb implements UserRepository {


    async create(user: UserCreate): Promise<UserDB> {
        const userCreated = await prisma.user.create({
            data: user,
        }); 
        if (!userCreated) throw new Error("Erro ao criar usuário");
        return userCreated;
    }
    async findById(id: string): Promise<UserDB> {
       
        const userFindById = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!userFindById) throw new Error("Usuário não encontrado");
        return userFindById;
    }
    async findByEmail(email: string): Promise<UserDB> {
       
        const userFindByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!userFindByEmail) throw new Error("Usuário não encontrado");
        return userFindByEmail;
    }
    async userExists(email: string): Promise<UserDB | null> {
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return userExists;
    }
    async update(user: UserUpdate): Promise<UserDB> {
        const userUpdated = await prisma.user.update({
            where: {
                email:user.email,
            },
            data: user,
        });
        if (!userUpdated) throw new Error("Erro ao atualizar usuário");
        return userUpdated;
    }

  
}