import express from "express";
import RUService from "../services/RUService";

const router = express.Router();

router.get("/vicosa", async (request, response) => {
  const service = new RUService();

  const vicosa = await service.campusVicosa("https://cardapio.ufv.br/");

  return response.json(vicosa);
});

router.get("/crp", async (request, response) => {
  const service = new RUService();

  const crp = await service.campusCRP(
    "https://sisru.crp.ufv.br/cardapioIframe.php"
  );

  return response.json(crp);
});

export default router;
