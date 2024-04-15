document.addEventListener('DOMContentLoaded',function(){
    //Seleccionar los elementos de la interfas
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    //Asignar eventos
    inputEmail.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);

    function validar(e){
        if(e.target.value.trim() === ''){
            // console.log('Esta vacio');
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
        }else{
            console.log('Si hay algo ...');
        }
    }

    function mostrarAlerta(mensaje,referencia){
        //Comprueba si ya existe uan alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }

        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center')
        //inyectar el error al formulario
        referencia.appendChild(error);
    }
})