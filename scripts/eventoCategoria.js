(() => {

    //obtenemos el select con las categorias
    const categorias = document.getElementById("categoria");

    //le agregamos un evento para cada que se cambie de opcion
    categorias.addEventListener("change", () => { colocarParametro(categorias.value) }, false);

    /**Funcion para colocar el parametro de la categoria en la url actual y redirigir la pagina */
    function colocarParametro(categoria){
        //obtenemos los parametros actuales
        let parametros = new URLSearchParams(window.location.search);
        
        //si la categoria es "todas", entonces removemos el parametro category de la url
        if(categoria == "todas"){
            parametros.delete("category");
        }else{
            //colocamos el parametro con la categoria
            parametros.set("category", categoria);
        }
         
        //generamos el nuevo enlace 
        const nuevaURL = document.location.protocol + '//' + window.location.hostname + window.location.pathname + "?" +  parametros.toString();

        //reedirigimos la pagina a la misma vista pero con los nuevos parametros
        window.location.href = nuevaURL;
    }

})();