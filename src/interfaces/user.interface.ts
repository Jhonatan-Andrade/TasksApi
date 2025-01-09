export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface User{
    id: string;
    name: string;
    email: string;
}
export interface UserDB{
    id: string;
    name: string;
    email: string;
    password: string;
}
export interface UserLogin{
    email: string;
    password: string;
}

export interface UserUpdate {
    name?: string;
    email: string;
    password?: string;
}
 export interface UserRepository {
    create(user: UserCreate): Promise<UserDB>;
    findById(id: string): Promise<UserDB>;
    findByEmail(email: string): Promise<UserDB>;
    userExists(email: string): Promise<UserDB | null>;
    update(user: UserUpdate): Promise<UserDB>;
 }