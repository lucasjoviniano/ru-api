import express from 'express';
import RUService from '../services/RUService';
import type Meal from '../models/meal'

const router = express.Router()

router.get("/vicosa", async (request, response) => {
    const service = new RUService()
    let vicosa: Meal[] | undefined = []

    // Gambiarra feita para caso a página demore a carregar
    // TODO: Aumentar tempo de espera do Puppeteer
    do {
        vicosa = await service.campusVicosa("https://cardapio.ufv.br/");
    } while (vicosa?.length === 0)

    return response.json(vicosa)
})

router.get("/crp", async (request, response) => {
    const service = new RUService()
    let crp: Meal[] | undefined = [];

    // Gambiarra feita para caso a página demore a carregar
    // TODO: Aumentar tempo de espera do Puppeteer
    do {
        crp = await service.campusCRP('https://sisru.crp.ufv.br/cardapioIframe.php')
    } while (crp?.length === 0)
    

    return response.json(crp)
})

export default router