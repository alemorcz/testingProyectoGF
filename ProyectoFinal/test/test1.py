from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

try:
    driver.get("http://127.0.0.1:3000/ProyectoFinal/pages/HTML/admin.html") 
    driver.maximize_window()

    time.sleep(2)

    titulo = driver.find_element(By.ID, "tituloFormulario") 

    titulo_esperado = "Formulario de Producto" 
    assert titulo.text == titulo_esperado, "Error: Se esperaba '{titulo_esperado}' pero se obtuvo '{titulo.text}'"

    print("✅ Test PASADO: El título es correcto.")

except Exception as e:
    print("❌ Test FALLADO: {e}")

finally:
    driver.quit()