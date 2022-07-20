import express, {Request, Response} from 'express';
import cors from 'cors'
import routes from './routes';

const PORT = 8000;

const app = express();

app.use(cors())
app.use(express.json())

app.use(routes)

app.get("/", async (request: Request, response: Response) => {
    return response.json({
        message: `Server Running. ${PORT}`
    });
});

app.listen(PORT, () => console.log("Server Running."))