//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners

eventListener();

function eventListener(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=> {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
    });
}

//Funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);
    //Validacion
    if(tweet === ''){
        mostrarError("Un mensaje no puede ir vacio");
        return//evita que se siga ejecutando mas lineas de codigo
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }


    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    //Una ves agregado vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}
//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Eliminar la alerta despues de 3 segundos
    setTimeout(() =>{
        mensajeError.remove();
    }, 3000);
}
//Mostrar un listado de los tweets
function crearHTML() {
    
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet =>{
            //Agregar un boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText="x";

            //Añadir ña funcion de eliminar 
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }
            //Crear el HTML
            const li = document.createElement('li');
            //Añadir el texto
            li.innerText = tweet.tweet;
            //Asignar el boton
            li.appendChild(btnEliminar);
            //Insertr en el html
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();

}
//Agrega los tweets actuales a Localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
//Eliminar un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}
//Limpiar el HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}