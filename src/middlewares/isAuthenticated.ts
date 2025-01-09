import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY
const expiresIn = {expiresIn:'1d'}

export async function isAuthenticated(req:FastifyRequest,reply:FastifyReply,done:HookHandlerDoneFunction) {
    if (!secret) {throw Error("API ERROR: SECRET KEY NOT FOUND")}
    
    const {authorization}  = req.headers 

    const token = authorization?.split(" ")[1]

    if (!token) { reply.code(401).send({ message: 'Token não informado' })}

    const auth = jwt.verify(token || "",secret)

    
    const {id} = req.params as { id: string }

    if (id) {req.params = {id,auth}}
    if (!id) {req.params = auth}
  
}
export  function signUser(email: string):string {
    if (!secret) {throw Error("API ERROR: SECRET KEY NOT FOUND")}
    const token = jwt.sign({ email, }, secret, expiresIn);
    if (!token) {throw Error("Usuario não autorisado ")}
   return token
}