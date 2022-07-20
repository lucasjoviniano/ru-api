"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RUService_1 = __importDefault(require("../services/RUService"));
const router = express_1.default.Router();
router.get("/vicosa", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const service = new RUService_1.default();
    let vicosa = [];
    do {
        vicosa = yield service.campusVicosa("https://cardapio.ufv.br/");
    } while ((vicosa === null || vicosa === void 0 ? void 0 : vicosa.length) === 0);
    return response.json(vicosa);
}));
router.get("/crp", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const service = new RUService_1.default();
    let crp = [];
    do {
        crp = yield service.campusCRP('https://sisru.crp.ufv.br/cardapioIframe.php');
    } while ((crp === null || crp === void 0 ? void 0 : crp.length) === 0);
    return response.json(crp);
}));
exports.default = router;
//# sourceMappingURL=campi.js.map