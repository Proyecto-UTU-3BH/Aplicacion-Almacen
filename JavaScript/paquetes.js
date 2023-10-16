function mostrarProductos(data) {
    
    const tbody = document.querySelector("table tbody");

    
    tbody.innerHTML = '';

    data.forEach(producto => {
        
        const row = document.createElement("tr");
        
        
        const valores = [
            producto.id,
            producto.destino,
            producto.estado,
            producto.tipo,
            producto.remitente,
            producto.nombre_destinatario,
            producto.calle,
            producto.numero_puerta,
            producto.forma_entrega,
            producto.peso
        ];

        
        valores.forEach(valor => {
            const cell = document.createElement("td");
            cell.textContent = valor;
            row.appendChild(cell);
        });

        
        const modificarCell = document.createElement("td");
        const modificarButton = document.createElement("button");
        modificarButton.textContent = "Modificar";
        modificarButton.addEventListener("click", () => {
            
        });
        modificarCell.appendChild(modificarButton);
        row.appendChild(modificarCell);

        
        const eliminarCell = document.createElement("td");
        const eliminarForm = document.createElement("form");
        eliminarForm.action = "#"; 
        const eliminarButton = document.createElement("button");
        eliminarButton.type = "submit";
        eliminarButton.textContent = "Eliminar";
        eliminarForm.appendChild(eliminarButton);
        eliminarCell.appendChild(eliminarForm);
        row.appendChild(eliminarCell);

        
        tbody.appendChild(row);
    });
}



document.addEventListener("DOMContentLoaded", function () {
    let idUsuario;
    const token = localStorage.getItem("access_token");
    const urlValidar = "http://localhost:8000/api/validate";
    const headers = {
        "Authorization": "Bearer " + token,
    };

    // Primera solicitud
    fetch(urlValidar, {
        method: "GET",
        headers: headers,
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error("Error en la solicitud");
        }
    })
    .then(data => {
        const userData = {
            primer_nombre: data.primer_nombre,
            primer_apellido: data.primer_apellido,
            segundo_apellido: data.segundo_apellido,
            usuario: data.usuario,
            idUsuario: data.id,
            tipo: data.tipo,
            calle: data.calle,
            ci: data.ci,
            numero_de_puerta: data.numero_de_puerta
        };

        sessionStorage.setItem("userData", JSON.stringify(userData));

        idUsuario = data.id;

        const urlProductos = "http://localhost:8001/api/usuarios/almacen/productos/"+idUsuario;
        return fetch(urlProductos, {
            method: "GET",
            headers: headers,
        });
    })
    .then(async response => {
        if (response.ok) {
            return response.json();
        } 
    })
    .then(data => {
        mostrarProductos(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});



