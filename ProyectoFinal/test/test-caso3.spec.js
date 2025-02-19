const assert = require("assert");
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe("Verificar que el formulario se envía correctamente", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Debería enviar el formulario y mostrar una alerta con el mensaje correcto", async function () {
        try {
            // Navegar a la página de contacto
            await driver.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/contacto.html");

            // Llenar el formulario
            await driver.findElement(By.id("nombre")).sendKeys("Alejandra Moreno");
            await driver.findElement(By.id("email")).sendKeys("ale.moreno@gmail.com");
            await driver.findElement(By.css("textarea")).sendKeys("Hola, quiero más información!");

            // Marcar el checkbox
            await driver.findElement(By.css("input[type='checkbox']")).click();

            // Enviar el formulario
            await driver.findElement(By.css("button[type='submit']")).click();

            // Esperar a que aparezca la alerta
            await driver.wait(until.alertIsPresent(), 5000);

            // Obtener el texto de la alerta
            let alerta = await driver.switchTo().alert();
            let mensajeAlerta = await alerta.getText();

            // Verificar el mensaje de la alerta
            assert.strictEqual(
                mensajeAlerta,
                "Recibimos tu mensaje, pronto te contactaremos!",
                "❌ Test fallido: El mensaje en la alerta es incorrecto."
            );

            console.log("✅ Test exitoso: La alerta tiene el mensaje esperado.");

            // Aceptar la alerta
            await alerta.accept();
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error; // Lanzar el error para que la prueba falle
        }
    });
});