# API Tasks

### Script Development
```bash
npm install
npx run dev:db
npm run dev
```
### Script Production 
```bash
npm install
npm run build
npx run start:db
npm run start
```

## Rotas de mãe 
| Rotas             | Metudo | Auth | 
| ----------------- | ------ | ---- | 
| /user/signup      | POST   | Não  | 
| /user/signin      | POST   | Não  | 
| /user/editProfile | PUT    | Sim  |
| /user             | GET    | Sim  | 
### Sign-up 

> [!NOTE]
>  Password deverá ter no .
>  - mínimo 8 caracteres.
>  - 1 letra maiúscula.
>  - 1 letra minúscula.
>  - 1 número.
>  - 1 caractere especial.


```javascript
{
    name:"Dev",
    email:"dev@gmail.com",
    password:"dev1_Dev"
}
```
### Sign-in

```javascript
{
    email:"dev@gmail.com",
    password:"dev1_Dev"
}
```
### Edit Profile

```javascript
{
    name:"Dev",
    password:"dev1_Dev"
    // Ambos são opcionais
}
```

### Rotas das tarefas
| Rotas      | Metudo | Auth | 
| ---------- | ------ | ---- | 
| /task      | POST   | Sim  | 
| /task      | PUT    | Sim  | 
| /task      | GET    | Sim  | 
| /task      | PUT    | Sim  | 

### Create Task
```javascript
{
    title:"Tarefa 1",
    description:"Descrição da tarefa 1",
    date:"00/00/0000"	
}
```
### Edit Task
```javascript
{
    id:"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" // id da tarefa Obrigatório
    taskStatus:"inprogress" /* Ou */  taskStatus:"completed"
}
```
### Delete Task
```javascript
{
    id:"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" // id da tarefa Obrigatório
}
```
