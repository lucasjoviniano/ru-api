"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const RUService_1 = __importDefault(require("./services/RUService"));
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const service = new RUService_1.default();
    let vicosa = [];
    let crp = [];
    do {
        vicosa = yield service.campusVicosa("https://cardapio.ufv.br/");
    } while ((vicosa === null || vicosa === void 0 ? void 0 : vicosa.length) === 0);
    do {
        crp = yield service.campusCRP('https://sisru.crp.ufv.br/cardapioIframe.php');
    } while ((crp === null || crp === void 0 ? void 0 : crp.length) === 0);
    const templateValues = {
        vicosa: JSON.stringify(vicosa, undefined, 2),
        crp: JSON.stringify(crp, undefined, 2)
    };
    response.render("home", templateValues);
}));
app.listen(PORT, () => console.log("Server Running."));
//# sourceMappingURL=server.js.map