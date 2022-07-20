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
    let vicosa: Meal[] | undefined = []
    let crp: Meal[] | undefined = []

    // Gambiarra feita para caso a página demore a carregar
    // TODO: Aumentar tempo de espera do Puppeteer
    do {
        vicosa = await service.campusVicosa("https://cardapio.ufv.br/");
    } while (vicosa?.length === 0)

    do {
        crp = await service.campusCRP('https://sisru.crp.ufv.br/cardapioIframe.php')
    } while (crp?.length === 0)
    
    const templateValues = {
        vicosa: JSON.stringify(vicosa, undefined, 2),
        crp: JSON.stringify(crp, undefined, 2)
    }

    response.render("home", templateValues)
});

app.listen(PORT, () => console.log("Server Running."))

type Meal = {
    'tipo': string,
    'cardapio': string[]
}