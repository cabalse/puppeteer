import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import bodyParser from "body-parser";

const targetUrl = "http://localhost:1234";
const loginUser = { uid: "jobe", pwd: "pwd" };

const products = [
  { productnumber: "1AB3", name: "Product Number One" },
  { productnumber: "KZ34YT", name: "Product Number TWO" },
];

function makeString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const app = express();
const port = 3000;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/api/products", (req, res) => {
  res.send({ products: products });
});

app.post("/api/products", (req, res) => {
  console.log(req.body);
  products.push({ productnumber: req.body.productnumber, name: req.body.name });
  res.send({ products: products });
});

app.get("/getProducts", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(targetUrl);
    await page.type("#username", loginUser.uid);
    await page.type("#password", loginUser.pwd);
    await Promise.all([
      page.click("#submitLogin"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await page.waitForSelector("#products");
    let value = await page.$eval("#products", (element) => {
      return element.innerHTML;
    });
    await page.screenshot({ path: "products-screenshot.png" });
    await browser.close();
    console.log(value);
    res.send(value);
  } catch (error) {
    console.log(error);
  }
});

app.get("/addProduct", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(targetUrl);
    await page.type("#username", loginUser.uid);
    await page.type("#password", loginUser.pwd);
    await Promise.all([
      page.click("#submitLogin"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await Promise.all([
      page.click("#register"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await page.waitForSelector("#productName");
    await page.type("#productname", makeString(6));
    await page.type("#productnumber", makeString(9));
    await page.screenshot({ path: "register-screenshot.png" });
    await Promise.all([
      page.click("#submitRegister"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await page.waitForSelector("#productName");
    browser.close();
    res.send("Product added");
  } catch (error) {
    console.log(error);
  }
});
