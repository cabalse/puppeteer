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
    // Launch a browser through Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Open Target Website
    await page.goto(targetUrl);

    // Type Username and Password (Assume that the login screen is the first we "see")
    await page.type("#username", loginUser.uid);
    await page.type("#password", loginUser.pwd);

    // Submit the login form and wait until the application has responded
    await Promise.all([
      page.click("#submitLogin"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    // Wait so that the list of Products are displayed, then Scrape the html code for the list of products
    await page.waitForSelector("#products");
    let value = await page.$eval("#products", (element) => {
      return element.innerHTML;
    });

    // Take a screenshot as proof :)
    await page.screenshot({ path: "products-screenshot.png" });

    // Clean up
    await browser.close();
    res.send(value);
  } catch (error) {
    console.log(error);
  }
});

app.get("/addProduct", async (req, res) => {
  try {
    // Launch a browser through Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Open Target Website
    await page.goto(targetUrl);

    // Type Username and Password (Assume that the login screen is the first we "see")
    await page.type("#username", loginUser.uid);
    await page.type("#password", loginUser.pwd);

    // Submit the login form and wait until the application has responded
    await Promise.all([
      page.click("#submitLogin"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    // Navigate to Register page/form
    await Promise.all([
      page.click("#register"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    // Wait for the Title element on the page to be displayed
    await page.waitForSelector("#productName");

    // Type in ProductName and Number (random strings)
    await page.type("#productname", makeString(6));
    await page.type("#productnumber", makeString(9));

    // Take a proof screenshot
    await page.screenshot({ path: "register-screenshot.png" });

    // Submit the Register form
    await Promise.all([
      page.click("#submitRegister"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    // Wait for a page element, again
    await page.waitForSelector("#productName");

    // Clean up
    browser.close();
    res.send("Product added");
  } catch (error) {
    console.log(error);
  }
});
