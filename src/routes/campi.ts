import express from 'express';
import RUService from '../services/RUService';

const router = express.Router()

type Meal = {
    'tipo': string,
    'cardapio': string[]
}

router.get("/vicosa", async (request, response) => {
    const service = new RUService()
    let vicosa: Meal[] | undefined = []
    do {
        vicosa = await service.campusVicosa("https://cardapio.ufv.br/");
    } while (vicosa?.length === 0)

    return response.json(vicosa)
})

router.get("/crp", async (request, response) => {
    const service = new RUService()
    let crp: Meal[] | undefined = [];
    do {
        crp = await service.campusCRP('https://sisru.crp.ufv.br/cardapioIframe.php')
    } while (crp?.length === 0)
    

    return response.json(crp)
})

export default router