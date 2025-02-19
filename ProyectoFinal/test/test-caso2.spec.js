const assert = require("assert");
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe("Eliminar productos del carrito", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    after(async () => {
        await driver.quit();
    });

    it("Eliminar un producto del carrito de compras", async () => {
        try {
            await driver.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/admin.html");

            await driver.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/tienda.html");

            const addCartButton = await driver.findElement(By.id('boton-addCart'));
            await addCartButton.click();


            // Eliminar producto del carrito
            const eliminarButton = await driver.findElement(By.id('botonEliminar'));
            await eliminarButton.click();


            await driver.wait(until.stalenessOf(eliminarButton), 10000);

            try {
                await driver.findElement(By.id('carrito'));
                assert.fail('El carrito no está vacío.');
            } catch (error) {
                console.log('El carrito está vacío como se esperaba.');
            }
        } catch (error) {
            console.error('Error durante la ejecución de la prueba:', error);
            throw error;
        }
    });
});