<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/index.css" type="text/css">
    <title>Stocks Bsale</title>
</head>
<body>
    <!--Encabezado de la página-->
    <header>
        <!--Titulo-->
        <h1>Bsale Test</h1>

        <!--Buscador-->
        <form action="" class="formBuscador" id="formBuscador">
            <input type="text" placeholder="Buscar producto" id="nombreProducto">
            <button type="submit" value="Buscar">
                <div class="btnBuscar"><object data="imagenes-iconos/lupa.svg" type="image/svg+xml"></object></div>
            </button>
        </form>

        <!--Categoría-->
        <form action="" class="formCategoria">
            <label for="categoria">Categoría</label>
            <select name="categoria" id="categoria">
                <option value="todas">Todas</option>
            </select>
        </form>
    </header>

    <!--Contenido (Productos)-->
    <main>
        <h1 id="mensajeError" class="oculto"></h1>
        <!--Ejemplo de como queda cada producto y su contenedor-->

        <!-- <article>
            <div>
                <img src="imagenes-iconos/sinImagen.png" alt="">
                <label for="">Bebida Energetica</label>
                <div>
                    <div class="cntPrecio">
                        <label for="">$145.52</label>
                    </div>
                    <div class="cntIconoCarrito">
                        <div><object data="imagenes-iconos/carritoCompra.svg" type="image/svg+xml"></object></div>
                    </div>
                </div>
            </div>
        </article> -->
        
    </main>

    <!--Scripts-->
    <script src="scripts/cargarProductos.js"></script>
    <script src="scripts/eventoCategoria.js"></script>
    <script src="scripts/eventoBuscador.js"></script>
</body>
</html>