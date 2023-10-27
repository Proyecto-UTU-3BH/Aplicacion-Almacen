function mostrarProductos(data) {
    
    const tbody = document.getElementById("productos");

    let htmlToAppend = '';

    data.forEach(producto => {
        htmlToAppend += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.destino}</td>
                <td>${producto.estado}</td>
                <td>${producto.tipo}</td>
                <td>${producto.remitente}</td>
                <td>${producto.nombre_destinatario}</td>
                <td>${producto.calle}</td>
                <td>${producto.numero_puerta}</td>
                <td>${producto.forma_entrega}</td>
                <td>${producto.peso}</td>
                <td class="modificar">
                    <button class="btnModificar" onclick="setCatID(${producto.id})">Modificar</button>
                </td>
                <td class="eliminar">
                    <button type="submit" class="eliminar-btn" data-producto-id="${producto.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = htmlToAppend;

    preguntarConfirmacion();

}

function preguntarConfirmacion() {

    document.querySelectorAll(".eliminar-btn").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idProducto = boton.getAttribute("data-producto-id");
            Swal.fire({
                title: "Confirmación de Eliminación",
                text: "¿Estás seguro de que deseas eliminar este producto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarProducto(idProducto)
                }
            });
        });
    });

}

function eliminarProducto(idProducto){
    const token = localStorage.getItem("access_token");
    const urlEliminarProducto = "http://localhost:8001/api/productos/"+idProducto;
    const headers = {
        "Authorization": "Bearer " + token,
    };

    fetch(urlEliminarProducto, {
        method: "DELETE",
        headers: headers,
    })
    .then(async response => {
      if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Producto Eliminado',
            text: 'El producto se ha eliminado correctamente.'
        }).then(() => {
            location.reload();
        });
      } else {
        const errorMessage = await response.text(); 
        console.error("Error en la solicitud:", errorMessage);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
};


function setCatID(id) {
    sessionStorage.setItem("idProducto", id);
    location.href = "modificarPaquete.html";
}



document.addEventListener("DOMContentLoaded", function () {
    let idUsuario;
    const token = localStorage.getItem("access_token");
    const urlValidar = "http://localhost:8000/api/validate";
    const headers = {
        "Authorization": "Bearer " + token,
    };

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
            numero_de_puerta: data.numero_de_puerta,
            telefono: data.telefono,
            almacen_id: data.almacen_id
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



