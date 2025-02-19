const assert = require("assert");
const { Builder, Browser } = require("selenium-webdriver");
const TiendaPage = require("../pages/JavaScript/tiendaPage");

describe("Agregar productos al carrito de compras", () => {
    let driver;
    let tiendaPage;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        tiendaPage = new TiendaPage(driver);
    });

    after(async () => {
        await driver.quit();
    });

    beforeEach(async () => {
        await tiendaPage.navigate();
    });

    it("Agregar un producto al carrito de compras", async () => {
        await tiendaPage.agregarProductoAlCarrito();
        const itemCount = await tiendaPage.obtenerCantidadProductosEnCarrito();
        assert.strictEqual(itemCount, "1", "El número de productos en el carrito no es correcto");
    });

    it("Agregar 2 productos al carrito de compras", async () => {
        await tiendaPage.agregarProductoAlCarrito();
        await tiendaPage.agregarProductoAlCarrito();
        const itemCount = await tiendaPage.obtenerCantidadProductosEnCarrito();
        assert.strictEqual(itemCount, "2", "El número de productos en el carrito no es correcto");
    });
});
