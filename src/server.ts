import express, {Request, Response} from 'express';
import cors from 'cors'
import routes from './routes';
import path from 'path';
import * as dotenv from 'dotenv';
import RUService from './services/RUService';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(cors())
app.use(express.json())

app.use(routes)

app.get("/", async (request: Request, response: Response) => {
    const service = new RUService()

    const vicosa = await service.campusVicosa("https://cardapio.ufv.br/");
    const crp = await service.campusCRP('https://sisru.crp.ufv.br/cardapioIframe.php')
    
    const templateValues = {
        vicosa: JSON.stringify(vicosa, undefined, 2),
        crp: JSON.stringify(crp, undefined, 2)
    }

    response.render("home", templateValues)
});

app.listen(PORT, () => console.log("Server Running."))