from selenium.webdriver.common.by import By

class ContactoPage:
    def __init__(self, driver):
        self.driver = driver
        self.nombre_input = (By.ID, "nombre")
        self.email_input = (By.ID, "email")
        self.mensaje_textarea = (By.ID, "mensaje")
        self.terminos_checkbox = (By.ID, "terminos")
        self.enviar_button = (By.ID, "enviar-contacto")
        self.limpiar_button = (By.XPATH, "//button[text()='Limpiar']") 
        
    def ingresar_nombre(self, nombre):
        self.driver.find_element(*self.nombre_input).send_keys(nombre)

    def ingresar_email(self, email):
        self.driver.find_element(*self.email_input).send_keys(email)

    def ingresar_mensaje(self, mensaje):
        self.driver.find_element(*self.mensaje_textarea).send_keys(mensaje)

    def marcar_terminos(self):
        self.driver.find_element(*self.terminos_checkbox).click()

    def click_enviar(self):
        self.driver.find_element(*self.enviar_button).click()

    def click_limpiar(self):
        self.driver.find_element(*self.limpiar_button).click()

    def obtener_mensaje_error_nombre(self):
        return self.driver.find_element(*self.nombre_input).get_attribute("title")

    def obtener_mensaje_error_email(self):
        return self.driver.find_element(*self.email_input).get_attribute("title")