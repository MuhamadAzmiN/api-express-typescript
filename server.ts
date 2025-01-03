import express, { Application} from "express";
import Server from "./src/index";


const app : Application = express();
const server : Server = new Server(app);
const PORT : number = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});