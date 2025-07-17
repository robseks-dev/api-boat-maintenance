import puppeteer from "puppeteer";
import handlebars from "handlebars";
import fs from "fs";
import chromium from "chrome-aws-lambda";

handlebars.registerHelper("add", function (a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    console.warn(
      `Helper 'add': Se esperaban dos números, pero se recibió ${typeof a} y ${typeof b}`
    );
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

handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

handlebars.registerHelper("formatDate", function (dateString) {
  if (!dateString) {
    return "";
  }
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", options);
});

handlebars.registerHelper("isCheckable", function (value) {
  const lowerValue = String(value).toLowerCase();
  return lowerValue === "si" || lowerValue === "no";
});

export const generatePDF = async (data, templatePath) => {
  let browser;
  try {
    const templateHtml = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(templateHtml);

    const context = { data };
    const finalHtml = template(context);

    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });

    /* browser = await puppeteer.launch({
      headless: "true",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }); */

    const page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,

      margin: {
        top: "60px",
        bottom: "60px",
        left: "25px",
        right: "25px",
      },
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
