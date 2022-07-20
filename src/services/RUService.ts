import cheerio from 'cheerio';
import { index } from 'cheerio/lib/api/traversing';
import * as puppeteer from 'puppeteer';

enum Refeicao {
    Cafe = "Café da Manhã",
    Almoco = "Almoço",
    Jantar = "Jantar",
    Alternativo = "Lanche Alternativo"
}

type CafeDaManha = {
    'tipo': string,
    'mingau'?: string,
    'fruta'?: string,
    'outros': [string]
}

type AlmocoOuJanta = {
    'tipo': string,
    'salada': [string],
    'prato_principal': string,
    'vegana': string,
    'vegetariana': string,
    'guarnicao': string,
    'acompanhamento': string,
    'sobremesa': string,
    'refresco': string
}

type Lanche = {
    'tipo': string,
    'fruta': string,
    'sobremesa': string,
    'recheio_de_pao': string,
    'outros': [string]
}

class RUService {
    public async scraping(url: string) {
        let meals: string[][][] = []
        const indexes: number[] = []

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(url);
            const pageData = await page.evaluate(() => {
                return {
                    html: document.documentElement.innerHTML
                }
            })

            const $ = cheerio.load(pageData.html)
            const element = $('#tbl_info tr td')
            const labels = element.toArray().map(str => { return $(str).text().trim()}).filter(value => !(value.includes("RU - I") || value.includes("RU - II") || value.includes("RU III")))

            const matches = labels.map((value) => {
                const splitted = value.split(' ').map(str => str.trim())
                if (value.includes("Cafe")) {
                    indexes.push(labels.indexOf(value))
                    return ["TIPO", splitted.slice(0, 3).join(' ')]
                } else if (value.includes("Alternativo")) {
                    indexes.push(labels.indexOf(value))
                    return ["TIPO", splitted.slice(0, 2).join(' ')]
                } else if (value.includes("Almoco") || value.includes("Jantar")) {
                    indexes.push(labels.indexOf(value))
                    return ["TIPO", splitted[0]]
                } else if  (value.startsWith(".:")) {
                    return ["OUTRO", splitted.slice(1, splitted.length).join(" ")]
                } else {
                    return value.split(":").map((x) => x.trim())
                }
            })

            for (let i = 1; i <= indexes.length; i++) {
                const n = matches.slice(indexes[i - 1], indexes[i])
                meals.push(n)
            }

            console.log(meals)

            browser.close();
        } catch (error) {
            console.log(error)
        }
    }

    checkType(tipo: string): Refeicao {
        const splitted = tipo.split(":")
        const value = splitted[1].trim()

        if (value == "Cafe da manhã") {
            return Refeicao.Cafe
        } else if (value == "Almoco") {
            return Refeicao.Almoco
        } else if (value == "Jantar") {
            return Refeicao.Jantar
        } else if (value == "Jantar Alternativo") {
            return Refeicao.Alternativo
        }

        throw new Error("Não existe outro tipo de refeição.")
    }
}

export default RUService