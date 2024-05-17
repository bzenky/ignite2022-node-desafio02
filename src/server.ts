import fastify from "fastify";
import { usersRoutes } from "./routes/users";
import { mealsRoutes } from "./routes/meals";

const app = fastify();

app.register(usersRoutes)
app.register(mealsRoutes)

app.listen({
  port: 3333
}).then(() => {
  console.log(`Server running on http://localhost:3333`);
});