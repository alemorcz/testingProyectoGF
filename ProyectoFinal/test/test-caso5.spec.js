const { Builder, Browser, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe('Agregar un producto y verificar que aparece en la lista', function () {
    this.timeout(30000); // Extiende el tiempo de espera máximo

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://127.0.0.1:3000/ProyectoFinal/pages/HTML/admin.html');
    });

    after(async function () {
        await driver.quit();
    });

    it('Debería agregar un producto y mostrarlo en la tabla', async function () {
        
        const producto = {
            name: 'Producto Chido Grupo Frontera',
            code: 'JS123',
            description: 'Un kit super padre incluye de todo',
            price: '500',
            discount: '10',
            image: 'https://cooglife.com/wp-content/uploads/2024/08/GrupoFrontera-23.jpg'
        };

        // Llenar formulario
        await driver.wait(until.elementLocated(By.id('productName')), 5000).sendKeys(producto.name);
        await driver.findElement(By.id('productCode')).sendKeys(producto.code);
        await driver.findElement(By.id('productDescription')).sendKeys(producto.description);
        await driver.findElement(By.id('productPrice')).sendKeys(producto.price);
        await driver.findElement(By.id('productDiscount')).sendKeys(producto.discount);
        await driver.findElement(By.id('productImage')).sendKeys(producto.image);

    
        await driver.findElement(By.css('button[type="submit"]')).click();

       
        const table = await driver.wait(until.elementLocated(By.id('productTable')), 10000);

    
        const tableText = await table.getText();

        
        assert(tableText.includes(producto.name), `El nombre del producto "${producto.name}" no se encontró en la tabla.`);
        assert(tableText.includes(producto.code), `El código del producto "${producto.code}" no se encontró en la tabla.`);
        assert(tableText.includes(producto.description), `La descripción del producto "${producto.description}" no se encontró en la tabla.`);
        assert(tableText.includes(`$${producto.price}`), `El precio del producto "$${producto.price}" no se encontró en la tabla.`);
    });
});