const { By } = require("selenium-webdriver");

class TiendaPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "http://127.0.0.1:3000/ProyectoFinal/pages/HTML/tienda.html";
        this.addCartButton = By.id("boton-addCart");
        this.cartItemCount = By.id("contador-items");
    }

    async navigate() {
        await this.driver.get(this.url);
    }

    async agregarProductoAlCarrito() {
        const addButton = await this.driver.findElement(this.addCartButton);
        await addButton.click();
    }

    async obtenerCantidadProductosEnCarrito() {
        const cartCountElement = await this.driver.findElement(this.cartItemCount);
        return await cartCountElement.getText();
    }
}

module.exports = TiendaPage;
