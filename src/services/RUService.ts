import cheerio from "cheerio";
import * as puppeteer from "puppeteer";
import type Meal from "../models/meal";

class RUService {
  private async getHtml(url: string) {
    // Argumentos utilizados para funcionar corretamente no Heroku.
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector(".titulo_composicao");
    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });

    browser.close();

    return pageData.html;
  }

  private getMeals(html: string, separator: string = ":") {
    const indexes: number[] = [];
    const meals: string[][][] = [];
    const json: Meal[] = [];

    const $ = cheerio.load(html);
    const element = $("#tbl_info tr td");
    const labels = element
      .toArray()
      .map((str) => {
        return $(str).text().trim();
      })
      .filter(
        (value) =>
          !(
            value.includes("RU - I") ||
            value.includes("RU - II") ||
            value.includes("RU III")
          )
      )
      .map((str) => str.replace(";", ""));

    // Tratamento de dados desnecessário, mas útil caso separemos a resposta no json em componentes da refeição
    const matches = labels.map((value) => {
      const splitted = value.split(" ").map((str) => str.trim());
      if (value.includes("Cafe")) {
        indexes.push(labels.indexOf(value));
        return ["TIPO", splitted.slice(0, 3).join(" ").trim()];
      } else if (value.includes("Alternativo")) {
        indexes.push(labels.indexOf(value));
        return ["TIPO", splitted.slice(0, 2).join(" ").trim()];
      } else if (
        value.includes("Almoco") ||
        value.includes("Jantar") ||
        value.includes("Almoço")
      ) {
        indexes.push(labels.indexOf(value));
        return ["TIPO", splitted[0]];
      } else if (value.startsWith(".:")) {
        return ["OUTRO", splitted.slice(1, splitted.length).join(" ").trim()];
      } else {
        return value.split(separator).map((x) => x.trim());
      }
    });

    for (let i = 1; i <= indexes.length; i++) {
      const n = matches.slice(indexes[i - 1], indexes[i]);
      meals.push(n);
    }

    for (let meal of meals) {
      const tipo = meal[0][1];
      const menu = meal.slice(1, meal.length).map((entry) => entry[1]);
      json.push({ tipo: tipo, cardapio: menu });
    }

    return json;
  }

  public async campusVicosa(url: string) {
    try {
      const html = await this.getHtml(url);
      const meals = this.getMeals(html);

      return meals;
    } catch (error) {
      console.log(error);
    }
  }

  public async campusCRP(url: string) {
    try {
      const html = await this.getHtml(url);
      const meals = this.getMeals(html, ",");

      return meals;
    } catch (error) {
      console.log(error);
    }
  }
}

export default RUService;
