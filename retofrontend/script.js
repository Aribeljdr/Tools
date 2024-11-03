// Variables y selectores
const mainContent = document.getElementById("main-content");
const modal = document.getElementById('countryModal');
const mapElement = document.getElementById('map');

// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", cargarPaises);
    document.querySelector('.close').addEventListener('click', cerrarModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal();
        }
    });
}

// Funciones
function cargarPaises() {
    fetch('https://restcountries.com/v3.1/lang/spa')
        .then(response => response.json())
        .then(data => {
            const countries = data.slice(0, 12); // Obtener los primeros 12 países
            crearGridPaises(countries);
        })
        .catch(error => console.error('Error fetching the countries:', error));
}

function crearGridPaises(countries) {
    const grid = document.createElement('div');
    grid.className = 'country-grid';

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.innerHTML = `
            <h5 class="country-title">${country.name.common}</h5>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Continente:</strong> ${country.continents ? country.continents[0] : 'N/A'}</p>
        `;
        countryCard.addEventListener('click', () => {
            mostrarModal(country);
        });
        grid.appendChild(countryCard);
    });

    mainContent.appendChild(grid);
}

function mostrarModal(country) {
    document.getElementById('modal-title').textContent = `Usted está en ${country.name.common}`;
    modal.style.display = 'block';
    inicializarMapa(country);
}

// Variable global para el mapa
let map;

function inicializarMapa(country) {
    // Si hay un mapa existente, eliminarlo
    if (map) {
        map.remove(); // Eliminar el mapa anterior
    }

    // Obtener las coordenadas del país
    const latlng = [country.latlng[0], country.latlng[1]];
    
    // Inicializar un nuevo mapa y establecer la vista
    map = L.map(mapElement).setView(latlng, 6);
    
    // Agregar la capa del mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}



function cerrarModal() {
    modal.style.display = 'none';
}
