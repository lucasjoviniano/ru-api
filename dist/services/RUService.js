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
const cheerio_1 = __importDefault(require("cheerio"));
const puppeteer = __importStar(require("puppeteer"));
class RUService {
    campusVicosa(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const meals = [];
            const json = [];
            const indexes = [];
            try {
                const browser = yield puppeteer.launch();
                const page = yield browser.newPage();
                yield page.goto(url);
                const pageData = yield page.evaluate(() => {
                    return {
                        html: document.documentElement.innerHTML
                    };
                });
                const $ = cheerio_1.default.load(pageData.html);
                const element = $('#tbl_info tr td');
                const labels = element.toArray().map(str => { return $(str).text().trim(); }).filter(value => !(value.includes("RU - I") || value.includes("RU - II") || value.includes("RU III")));
                // Tratamento de dados desnecessário, mas útil caso separemos a resposta no json em componentes da refeição
                const matches = labels.map((value) => {
                    const splitted = value.split(' ').map(str => str.trim());
                    if (value.includes("Cafe")) {
                        indexes.push(labels.indexOf(value));
                        return ["TIPO", splitted.slice(0, 3).join(' ')];
                    }
                    else if (value.includes("Alternativo")) {
                        indexes.push(labels.indexOf(value));
                        return ["TIPO", splitted.slice(0, 2).join(' ')];
                    }
                    else if (value.includes("Almoco") || value.includes("Jantar")) {
                        indexes.push(labels.indexOf(value));
                        return ["TIPO", splitted[0]];
                    }
                    else if (value.startsWith(".:")) {
                        return ["OUTRO", splitted.slice(1, splitted.length).join(" ")];
                    }
                    else {
                        return value.split(":").map((x) => x.trim());
                    }
                });
                for (let i = 1; i <= indexes.length; i++) {
                    const n = matches.slice(indexes[i - 1], indexes[i]);
                    meals.push(n);
                }
                for (let meal of meals) {
                    const tipo = meal[0][1];
                    const menu = meal.slice(1, meal.length).map(entry => entry[1]);
                    json.push({ tipo: tipo, cardapio: menu });
                }
                //console.log(json)
                browser.close();
                return json;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    campusCRP(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const meals = [];
            const json = [];
            const indexes = [];
            try {
                const browser = yield puppeteer.launch();
                const page = yield browser.newPage();
                yield page.goto(url);
                const pageData = yield page.evaluate(() => {
                    return {
                        html: document.documentElement.innerHTML
                    };
                });
                const $ = cheerio_1.default.load(pageData.html);
                const element = $('#tbl_info tr td');
                const labels = element.toArray().map(str => { return $(str).text().trim(); }).map(str => str.replace(';', ""));
                const matches = labels.map((value) => {
                    const splitted = value.split(' ').map(str => str.trim());
                    if (value.includes("Almoço") || value.includes("Jantar")) {
                        indexes.push(labels.indexOf(value));
                        return ["TIPO", splitted[0]];
                    }
                    else {
                        return value.split(",").map((x) => x.trim());
                    }
                });
                for (let i = 1; i <= indexes.length; i++) {
                    const n = matches.slice(indexes[i - 1], indexes[i]);
                    meals.push(n);
                }
                for (let meal of meals) {
                    const tipo = meal[0][1];
                    const menu = meal.slice(1, meal.length).map(entry => entry[1]);
                    json.push({ tipo: tipo, cardapio: menu });
                }
                //console.log(json)
                browser.close();
                return json;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = RUService;
//# sourceMappingURL=RUService.js.map