import puppeteer from "puppeteer";
import handlebars from "handlebars";
import fs from "fs";

handlebars.registerHelper("add", function (a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    console.warn(`Helper 'add': Se esperaban dos números, pero se recibió ${typeof a} y ${typeof b}`);
    return "";
  }
  return a + b;
});

handlebars.registerHelper("toFixed", function (number, digits) {
  try {
    return number.toFixed(digits);
  } catch (error) {
    console.error(`Helper 'toFixed': Error al formatear ${number} con ${digits} dígitos:`, error);
    return number;
  }
});

handlebars.registerHelper("formatNumberFixed", function (number, decimals = 2) {
  const parsed = parseFloat(number);
  if (isNaN(parsed)) return "";
  return parsed
    .toFixed(decimals)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

export const generatePDF = async (data, templatePath) => {
  let browser;
  try {
    const templateHtml = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(templateHtml);
    const finalHtml = template(data);

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(finalHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return pdfBuffer;
  } catch (error) {
    console.error("Error generando PDF desde plantilla:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};