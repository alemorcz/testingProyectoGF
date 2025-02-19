const { Builder, Browser, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Verificar que el mensaje del checkbox aparezca correctamente", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Debería mostrar un mensaje de error si el checkbox no está marcado", async function () {
        try {
            // Navegar a la página de contacto
            await driver.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/contacto.html");

            // Llenar los campos con datos válidos
            await driver.findElement(By.id("nombre")).sendKeys("Alejandra Moreno");
            await driver.findElement(By.id("email")).sendKeys("ale.moreno@gmail.com");
            await driver.findElement(By.css("textarea")).sendKeys("Hola, quiero más información!");

            // Enviar el formulario sin marcar el checkbox
            await driver.findElement(By.css("button[type='submit']")).click();

            // Esperar a que aparezca el mensaje de error
            let mensajeError = await driver.wait(
                until.elementLocated(By.xpath("//*[contains(text(),'Debes aceptar los términos y condiciones')]")),
                10000 // Aumentar el tiempo de espera a 10 segundos
            );

            // Verificar que el mensaje de error es visible
            let visible = await mensajeError.isDisplayed();
            assert.strictEqual(
                visible,
                true,
                "❌ Test fallido: No se encontró el mensaje de error."
            );

            console.log("✅ Test exitoso: Se mostró el mensaje de error correctamente.");
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error; // Lanzar el error para que la prueba falle
        }
    });
});