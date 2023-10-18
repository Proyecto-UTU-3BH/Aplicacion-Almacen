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
                    <a href="#"><button class="btnModificar">Modificar</button></a>
                </td>
                <td class="eliminar">
                    <form action="#" method="POST">
                        <button type="submit">Eliminar</button>
                    </form>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = htmlToAppend;
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



