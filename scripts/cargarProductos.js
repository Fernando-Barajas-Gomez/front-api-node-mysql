/**Función autoinvocada para cargar de forma automática los productos a la vista */
(() => {

  /**Función para obtener los parametros de la url*/
  function obtenerParametros(){
    const valores = window.location.search;  //obtenemos el bloque de parametros de la url
    return new URLSearchParams(valores); //retornamos los parametros
  }

  /**Funcion principal para ejecutar todo el bloque de instrucciones en secuencias */
  const main = (parametros) => {

    //colocamos las categorias
    obtenerTodasCategorias();

    //si no contiene ningun parametro
    if(!parametros.has('category') && !parametros.has('product')){
      obtenerTodosProductos();
    }
    //si solo contiene el parametro category
    else if(parametros.has('category') && !parametros.has('product')){
      obtenerUnaCategoria(parametros.get('category'));
      setTimeout(() => { selectedOpcion(parametros.get('category')); }, 500);
    }
    //si solo contiene el parametro product
    else if(!parametros.has('category') && parametros.has('product')){
      obtenerCiertoProducto(parametros.get("product"));
      colocarProductoBuscador(parametros.get("product"));
    }
    //si contiene ambos parametros
    else if(parametros.has('category') && parametros.has('product')){
      obtenerCiertoProductoCategoria(parametros.get('product'), parametros.get('category'));
      setTimeout(() => { selectedOpcion(parametros.get('category')); }, 500);
      colocarProductoBuscador(parametros.get("product"));
    }
  }

  /**Funcion para colocar el nombre del producto en el navegador al recargar la pagina */
  function colocarProductoBuscador(busqueda){
     //colocamos el nombre (busqueda) en el buscador
    document.getElementById("nombreProducto").value = busqueda;;
  }

  /**Función para obtener cierto producto de cierta categoria*/
  function obtenerCiertoProductoCategoria(producto, categoria){
    //petición a la API para obtener los productos de tal categoria
    fetch(`https://api-stocks-bsale.herokuapp.com/product/category/${producto}/${categoria}`)
      .then(response => {
          //revisamos el estado de la peticion, y si es un codigo 200
          if(response.ok){
            return response.json(); //retornamos la respuesta
          }
          throw "Error con status: "+response.status+" - "+response.statusText; //lanzamos el mensaje de error
      }) 
      //mandamos los productos y sus datos 
      .then(json => colocarProductos(json.data))
      //si surge algun error
      .catch(error => colocarMensaje(error));
  }

  /**Función para obtener los productos con el nombre del buscador que el usuario coloco*/
  function obtenerCiertoProducto(producto){
    //petición a la API para obtener los productos
    fetch(`https://api-stocks-bsale.herokuapp.com/product/${producto}`)
      .then(response => {
          //revisamos el estado de la peticion, y si es un codigo 200
          if(response.ok){
            return response.json(); //retornamos la respuesta
          }
          throw "Error con status: "+response.status+" - "+response.statusText; //lanzamos el mensaje de error
      }) 
      //mandamos los productos y sus datos 
      .then(json => colocarProductos(json.data))
      //si surge algun error
      .catch(error => colocarMensaje(error));
  }

  /**Funcion para colocar el selected predeterminado a la categoria que escogio el usuario */
  function selectedOpcion(categoria){
    const cntPrincipal = document.getElementById("categoria"); //obtenemos el contenedor principal donde se encuentran las categorias
    const opciones = cntPrincipal.options; //obtenemos todas las opciones (categorias)
    //recorremos las opciones (categorias)
    for(let i=0;i<opciones.length;i++){
      if(opciones[i].value == categoria){ //si la categoria es igual
          opciones[i].selected=true; //se le coloca el atributo selected
          break;
      }
    }
  }

  /**Funcion para obtener todos los productos de cierta categoria */
  function obtenerUnaCategoria(categoria){
    //petición a la API para obtener los productos
    fetch(`https://api-stocks-bsale.herokuapp.com/category/${categoria}`)
      .then(response => {
          //revisamos el estado de la peticion, y si es un codigo 200
          if(response.ok){
            return response.json(); //retornamos la respuesta
          }
          throw "Error con status: "+response.status+" - "+response.statusText; //lanzamos el mensaje de error
      }) 
      //mandamos los productos y sus datos 
      .then(json => colocarProductos(json.data))
      //si surge algun error
      .catch(error => colocarMensaje(error));
  }

  /**Funcion para obtener todos los productos de la base de datos */
  function obtenerTodosProductos(){
    //petición a la API para obtener todos los productos
    fetch('https://api-stocks-bsale.herokuapp.com/products')
      .then(response => {
          //revisamos el estado de la peticion, y si es un codigo 200
          if(response.ok){
            return response.json(); //retornamos la respuesta
          }
          throw "Error con status: "+response.status+" - "+response.statusText; //lanzamos el mensaje de error
      }) 
      //mandamos los productos y sus datos 
      .then(json => colocarProductos(json.data))
      //si surge algun error
      .catch(error => colocarMensaje(error));
  }

    /**Función para colocar un mensaje en la vista, como por ejemplo: algun error, mensaje, etc.*/
  function colocarMensaje(mensaje){
    const titulo = document.getElementById("mensajeError");
    titulo.classList.remove("oculto");
    titulo.textContent = mensaje;
  }

  /**Funcion para obtener todas las categorias*/
  function obtenerTodasCategorias(){
    //petición a la API para obtener todas categorias
    fetch('https://api-stocks-bsale.herokuapp.com/categories')
      .then(response => {
          //revisamos el estado de la peticion, y si es un codigo 200
          if(response.ok){
            return response.json(); //retornamos la respuesta
          }
          throw "Error con status: "+response.status+" - "+response.statusText; //lanzamos el mensaje de error
      }) 
      //mandamos el nombre de las categorias
      .then(json => colocarCategorias(json.data))
      //si surge algun error
      .catch(error => colocarMensaje(error));
  }


  /**Funcion para colocar los nombres de las categorias en el menu */
  function colocarCategorias(categorias){
    if(categorias !==[]){
      const cntPrincipal = document.getElementById("categoria"); //obtenemos el contenedor principal donde se colocaran las categorias

      categorias.forEach(categoria => {
        //creamos los elementos
        const opcion = document.createElement("option"); //opcion del select
        
        //colocamos los valores a la opcion
        opcion.value = categoria["name"];
        opcion.textContent = categoria["name"];

        //concatenamos los elementos
        cntPrincipal.appendChild(opcion); //concatenamos la opcion al select
      });
    }
  }

  /**Funcion para colocar los productos en la vista */
  function colocarProductos(productos){
    console.log(productos);
    //si los productos estan vacios
    if(productos.length === 0){ 
      colocarMensaje("No se encontro ningún producto");
    }
    else{

      //ocultamos el titulo para mensajes de errores
      const titulo = document.getElementById("mensajeError");
      titulo.classList.add("oculto");

      const cntPrincipal = document.getElementsByTagName("main")[0]; //obtenemos el contenedor principal donde se colocara el producto

      //generamos cada elemento del producto para poder colocarlo en la vista
      productos.forEach(producto => {
        
        //creamos los elementos
        const articulo = document.createElement("article"), //contenedor general de cada producto
              tarjeta = document.createElement("div"), //tarjeta con fondo blanco de cada producto
              imagen = document.createElement("img"), //imagen del producto
              nombre = document.createElement("label"), //etiqueta para el nombre
              cntDetalles = document.createElement("div"), //contenedor general para colocar los detalles (precio e icono)
              cntPrecio = document.createElement("div"), //contenedor del precio
              precio = document.createElement("label"), //etiqueta para el precio
              cnt1Icono = document.createElement("div"), //contenedor general del contenedor del icono
              cnt2Icono = document.createElement("div"), //contenedor del icono
              icono = document.createElement("object"); //icono
        
        //agregamos las clases
        cntPrecio.classList.add("cntPrecio");
        cnt1Icono.classList.add("cntIconoCarrito");

        //colocamos los datos a cada uno
        imagen.src = producto["url_image"] === "" ? "imagenes-iconos/sinImagen.png" : producto["url_image"]; //si la imagen esta vacia, colocamos una por defecto
        nombre.textContent = producto["name"];
        precio.textContent = "$"+producto["price"];
        icono.type = "image/svg+xml";
        icono.data = "imagenes-iconos/carritoCompra.svg";


        //concatenamos los elementos
        cnt2Icono.appendChild(icono); //icono a su contenedor
        cnt1Icono.appendChild(cnt2Icono); //el contenedor del icono a su contenedor
        cntPrecio.appendChild(precio) //el precio a su contenedor
        cntDetalles.appendChild(cntPrecio); //el contenedor del precio al contenedor de detalles
        cntDetalles.appendChild(cnt1Icono); //el contenedor del icono al contenedor de detalles
        tarjeta.appendChild(imagen); //la imagen a la tarjeta
        tarjeta.appendChild(nombre); //el nombre a la tarjeta
        tarjeta.appendChild(cntDetalles); //los detalles a la tarjeta
        articulo.appendChild(tarjeta); //la tarjeta al articulo

        //si el producto tiene algun descuento
        if(producto["discount"] !== 0){

          precio.classList.add("subrayar"); //subrayamos el precio anterior añadiento la clase
          const precioDescuento = document.createElement("label"); //creamos el nuevo elemento para colocar el nuevo precio
          precioDescuento.classList.add("descuento"); //le añadimos la clase descuento para colocarlo en rojo
          precioDescuento.textContent = "$"+ (parseFloat(producto["price"]) - (parseFloat(producto["price"] * parseFloat("."+producto["discount"])))); //realizamos la operacion para obtener el precio final
          cntPrecio.appendChild(precioDescuento); //concatenamos el precio nuevo al contenedor
        }

        cntPrincipal.appendChild(articulo); //el contedor del producto general al contenedor principal

      });
    }
  }

  //ejecucion del main
  main(obtenerParametros());
})();