import express from "express";
import routes from "./routes";
import { APP_PORT } from "./config";
const app = express();

app.use('/api', routes)


app.listen(APP_PORT, () => {
  console.log(`Listening on port  ${APP_PORT}`);
});



