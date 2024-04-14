//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];
 
cargarEventListeners();
function cargarEventListeners (){
    //Cuando agregas un curso  "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)
}
//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//Lee el contenido del HTML  y estrae la informacion del curso
function leerDatosCurso(curso){
    // console.log(curso);

    //Crear un objeto con eñ contenido del cursos actual 
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(infoCurso);

    //Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito,infoCurso];
    console.log(articulosCarrito);

    carritoHTML();
};

//Muestra el Carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}
//Elimina los cursos del tdoby
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}