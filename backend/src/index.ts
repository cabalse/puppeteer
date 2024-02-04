import express from "express";
import puppeteer from "puppeteer";

const browser = createBrowser();

const app = express();
const port = 3000;

const targetUrl = "http://localhost:1234";
const loginUser = {uid: "jobe", pwd: "pwd"};

app.get("/getProducts", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(targetUrl);

  await page.type('[aria-label="Search"]', "steve jobs")

  await browser.close();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
