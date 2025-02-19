const assert = require("assert");
const { Builder, Browser, By } = require("selenium-webdriver");

describe("Agregar productos al carrito de compras", () =>{
    let shoppingCart = new Builder().forBrowser(Browser.CHROME).build();
    

    it("Agregar un producto al carrito de compras", async () => {
        await shoppingCart.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/admin.html")
        

        shoppingCart.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/tienda.html");
        const addCartButton = await shoppingCart.findElement(By.id('boton-addCart'));

        await addCartButton.click();
        const cartItemCount = await shoppingCart.findElement(By.id('contador-items'));
        const itemCount = await cartItemCount.getText();
        assert.equal(itemCount, '1');
    });

    it("Agregar 2 productos al carrito de compras", async () => {
        await shoppingCart.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/admin.html")
         

        shoppingCart.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/tienda.html");
        const addCartButton = await shoppingCart.findElement(By.id('boton-addCart'));

        await addCartButton.click();
        await addCartButton.click();
        const cartItemCount = await shoppingCart.findElement(By.id('contador-items'));
        const itemCount = await cartItemCount.getText();
        assert.equal(itemCount, '2');
    });
});