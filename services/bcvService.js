import axios from "axios";
import cheerio from "cheerio";

const URL = "https://www.bcv.org.ve/";
//const URL = "https://www.bcv.org.ve/tasas-informativas-sistema-bancario";


export async function obtenerTasaBCV() {
  try {
    const { data } = await axios.get(URL);

    const $ = cheerio.load(data);

    let tasaUSD = null;

    // Buscar donde aparece "USD"
    $("div, span, strong").each((i, el) => {
      const text = $(el).text().trim();

      if (text === "USD") {
        // El valor suele estar cerca (hermano o padre)
        const parent = $(el).parent();

        const valor = parent.find("strong").last().text().trim();

        if (valor) {
          tasaUSD = valor;
        }
      }
    });

    if (!tasaUSD) {
      throw new Error("No se pudo obtener la tasa");
    }

    return {
      moneda: "USD",
      tasa: tasaUSD,
      fuente: "BCV"
    };

  } catch (error) {
    console.error("Error scraping BCV:", error.message);
    return null;
  }
}

// Ejemplo de uso
obtenerTasaBCV().then(console.log);