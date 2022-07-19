import express, {Request, Response} from 'express';
import RUService from './services/RUService';

const PORT = 8000;

const app = express();

app.get("/", async (request: Request, response: Response) => {
    const service = new RUService;

    const ru = await service.scraping("https://cardapio.ufv.br/");
    
    return response.json({
        message: `Server Running. ${PORT}`
    });
});

app.listen(PORT, () => console.log("Server Running."))