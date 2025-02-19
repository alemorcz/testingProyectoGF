from pages.contacto_page import ContactoPage

def test_enviar_formulario_exitoso(driver):
    contacto_page = ContactoPage(driver)
    contacto_page.ingresar_nombre("Usuario de Prueba")
    contacto_page.ingresar_email("prueba@ejemplo.com")
    contacto_page.ingresar_mensaje("Este es un mensaje de prueba.")
    contacto_page.marcar_terminos()
    contacto_page.click_enviar()
    
def test_limpiar_formulario(driver):
    contacto_page = ContactoPage(driver)
    contacto_page.ingresar_nombre("Usuario de Prueba")
    contacto_page.ingresar_email("prueba@ejemplo.com")
    contacto_page.ingresar_mensaje("Este es un mensaje de prueba.")
    contacto_page.click_limpiar()
    assert contacto_page.driver.find_element(*contacto_page.nombre_input).get_attribute('value') == ""
    assert contacto_page.driver.find_element(*contacto_page.email_input).get_attribute('value') == ""
    assert contacto_page.driver.find_element(*contacto_page.mensaje_textarea).get_attribute('value') == ""

def test_validar_nombre_invalido(driver,):
    contacto_page = ContactoPage(driver)
    contacto_page.ingresar_nombre("123456789101112131415161718192021")
    assert contacto_page.obtener_mensaje_error_nombre() == "El nombre solo puede contener letras y espacios, máximo 20 caracteres."

def test_validar_email_invalido(driver):
    contacto_page = ContactoPage(driver)
    contacto_page.ingresar_email("emailinvalido")
    assert contacto_page.obtener_mensaje_error_email() == "Por favor, introduce un correo válido."