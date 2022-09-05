# STOCKS BSALE
***

Frontend a través del cual se listan los diversos productos que hay en stock. Visualización.

## Funcionamiento general
---
---

Toda solicitud para filtar productos se realiza a través de los parámetros en la URL. Al cargar la página automáticamente se revisan estos y de esta forma se realizan solicitudes de tipo GET a la API, a partir del resultado se cargan los productos.

## Scripts
---
---
- **cargarProductos.js:** Script principal que autoejecuta una función para obtener los parámetros de la URL y a partir de estos, revisar la solicitud GET que se hará a la API. Una vez realizada la solicitud se encarga de colocar el mensaje de error si hubo alguno, de lo contrario, coloca los productos en la vista, al igual que las diversas categorías en el menú.


- **eventoBuscador.js:** Script encargado de revisar y colocar el producto buscado por el usuario a través del buscador, en la URL.

- **eventoCategoría.js:** Script encargado de revisar y colocar la categoría seleccionada por el usuario a través del menú, en la URL.

### Get Todos los productos
---
---
- Enlace ejemplo:

    http://stocks-bsale.herokuapp.com/

- Descripción: 

    Al no contener ningún parámetro la URL, se hace una petición a la API para obtener todos los productos del stock.

### Get Producto específico
---
---
- Enlace ejemplo:

    http://stocks-bsale.herokuapp.com/?product=parametro

- Descripción: 

    Si el usuario realizó la búsqueda de cierto producto a través del buscador, se obtiene el dato y se coloca el parámetro **product** en la URL y su valor **parametro**, este es el nombre del producto a buscar.

### Get Productos de cierta categoría
---
---
- Enlace ejemplo:

    http://stocks-bsale.herokuapp.com/?category=parametro

- Descripción: 

    Si el usuario seleccionó cierta categoría a través del menú, se obtiene el dato y se coloca el parámetro **category** en la URL y su valor **parametro**, este es la categoría seleccionada.

### Get Producto específico y categoría específica
---
---
- Enlace ejemplo:

    http://stocks-bsale.herokuapp.com/?product=parametro1&category=parametro2

- Descripción: 

    Si el usuario realizó la búsqueda de cierto producto a través del buscador y seleccionó cierta categoría a través del menú, se obtienen ambos datos y se colocan los parámetros **category** y **product** en la URL y los valores  **parametro1**, es el nombre del producto a buscar; y **parametro2**  la categoría seleccionada; 