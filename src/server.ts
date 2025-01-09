

import 'dotenv/config'; 
import fastify from "fastify";
import cors from "@fastify/cors";

import { UserRouter } from "./routers/user.router";
import { TaskRouter } from "./routers/task.router";

const app = fastify()
app.register(cors)

app.register(UserRouter)
app.register(TaskRouter)

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' })
})

app.listen({
    host:'0.0.0.0',
    port:process.env.PORT?Number(process.env.PORT): 3333,

}).then( ()=>console.log(`Server is Running`)) 