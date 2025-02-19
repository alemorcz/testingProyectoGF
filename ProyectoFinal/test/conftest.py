import pytest
from selenium import webdriver

@pytest.fixture
def driver():
    driver = webdriver.Chrome() # o el navegador que uses.
    driver.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/contacto.html") # Asegúrate de poner la ruta correcta a tu archivo HTML
    yield driver
    driver.quit()