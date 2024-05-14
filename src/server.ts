import fastify from "fastify";
import { usersRoutes } from "./routes/users";

const app = fastify();

app.register(usersRoutes)

app.listen({
  port: 3333
}).then(() => {
  console.log(`Server running on http://localhost:3333`);
});