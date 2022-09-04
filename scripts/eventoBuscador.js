(() => {
    //obtenemos los elementos del DOM
    const formBuscador = document.getElementById("formBuscador"), //formulario del buscador
            nombreProducto = document.getElementById("nombreProducto"); //input text del buscador

    //colocamos un evento al formulario para cuando se envie (boton submit o enter)
    formBuscador.addEventListener("submit", (e) => { 
        e.preventDefault(); //evitamos que se envie el formulario para poder preprocesar los datos
        colocarParametro(nombreProducto.value.trim()); //mandamos el nombre del producto como parametro
    }, false);

    /**Funcion para colocar el parametro del nombre del producto en la url actual y redirigir la pagina */
    function colocarParametro(producto){
        //obtenemos los parametros actuales
        let parametros = new URLSearchParams(window.location.search);
        
        //si el nombre del producto esta vacio, entonces removemos el parametro product de la url
        if(producto == ""){
            parametros.delete("product");
        }else{
            //colocamos el parametro con el nombre del producto
            parametros.set("product", producto);
        }
         
        //generamos el nuevo enlace 
        const nuevaURL = document.location.protocol + '://' + window.location.hostname + window.location.pathname + "?" +  parametros.toString();

        //reedirigimos la pagina a la misma vista pero con los nuevos parametros
        window.location.href = nuevaURL;
    }
})();