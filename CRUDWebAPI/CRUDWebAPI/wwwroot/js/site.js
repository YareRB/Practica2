﻿const uri = 'api/cancions';
let canciones = [];

function getCanciones() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayCanciones(data))
        .catch(err => console.error('unable to get songs', err));
}

function addCancion() {
    const addTitleTextbox = document.getElementById('add-title');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addGenreTextbox = document.getElementById('add-genre');
    const addPriceTextbox = document.getElementById('add-price');

    const cancion = {
        titulo: addTitleTextbox.value.trim(),
        descripcion: addDescriptionTextbox.value.trim(),
        genero: addGenreTextbox.value.trim(),
        precio: parseInt(addPriceTextbox.value)

    };

    console.log(cancion)

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cancion)
    })
        .then(response => response.json())
        .then(() => {
            getCanciones();
            addTitleTextbox.value = '';
            addDescriptionTextbox.value = '';
            addGenreTextbox.value = ''
            addPriceTextbox.value = 0;
        })
        .catch(error => console.error('unable to add song', error));
}

function deleteCancion(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getCanciones())
        .catch(error => console.error('unable to delete cancion', error));
}


function displayEditForm(id) {

    document.getElementById('addForm').style.display = 'none';
    const cancion = canciones.find(cancion => cancion.id === id);
    console.log(cancion)
    document.getElementById('edit-id').value = cancion.id
    document.getElementById('edit-title').value = cancion.titulo
    document.getElementById('edit-description').value = cancion.descripcion
    document.getElementById('edit-genre').value = cancion.genero
    document.getElementById('edit-price').value = cancion.precio
    document.getElementById('editForm').style.display = 'block';
}

function updateCancion() {
    const cancionId = document.getElementById('edit-id').value;

    const cancion = {
        id: parseInt(cancionId, 10),
        titulo: document.getElementById('edit-title').value,
        descripcion: document.getElementById('edit-description').value,
        genero: document.getElementById('edit-genre').value,
        precio: parseInt(document.getElementById('edit-price').value),
    };

    fetch(`${uri}/${cancionId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cancion)
    })
        .then(() => getCanciones())
        .catch(error => console.error('Unable to update song', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('addForm').style.display = 'block';
}

function _displayCount(cancionCount) {
    const name = (cancionCount === 1) ? 'cancion' : 'canciones';

    document.getElementById('counter').innerText = `${cancionCount} ${name}`;
}

function _displayCanciones(data) {
    const tBody = document.getElementById('canciones');
    tBody.innerText = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(cancion => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.className = "btn-tabla";
        editButton.setAttribute('onclick', `displayEditForm(${cancion.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.className = "btn-tabla";
        deleteButton.setAttribute('onclick', `deleteCancion(${cancion.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodeId = document.createTextNode(cancion.id)
        td1.appendChild(textNodeId);

        let td2 = tr.insertCell(1);
        let textNodeTitle = document.createTextNode(cancion.titulo)
        td2.appendChild(textNodeTitle);

        let td3 = tr.insertCell(2);
        let textNodeDescription = document.createTextNode(cancion.descripcion)
        td3.appendChild(textNodeDescription);

        let td4 = tr.insertCell(3);
        let textNodeGenre = document.createTextNode(cancion.genero)
        td4.appendChild(textNodeGenre);

        console.log(cancion)
        let td5 = tr.insertCell(4);
        let textNodePrice = document.createTextNode(cancion.precio)
        td5.appendChild(textNodePrice);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        td6.appendChild(deleteButton);

    });

    canciones = data;
}