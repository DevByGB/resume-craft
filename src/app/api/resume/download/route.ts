import { formatTailwindHTML } from "@/lib/utils";

import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { html, structure } = body;

    if (!html || !structure) return Response.json(
      { message: "Parâmetros inválidos" },
      { status: 400 }
    );

    let browser = null;

    if (process.env.NODE_ENV === "development") {
      browser = await puppeteer.launch();
    } else {
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }

    const page = await browser.newPage();

    await page.setContent(formatTailwindHTML(html, structure));

    // @ts-expect-error
    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight + 20;
    });

    const pdf = await page.pdf({
      width: "210mm",
      height: `${bodyHeight}px`,
      printBackground: true,
    });

    await browser.close();

    return new Response(pdf, {
      headers: {
        "Content-type": "application/pdf",
      }
    })
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Ocorreu um erro inesperado", error },
      { status: 500 }
    )
  }
}