function mostrarDatosPaquete (paquete) {
    document.getElementById("Remitente").value = paquete.remitente;
    document.getElementById("NombreDestinatario").value = paquete.nombre_destinatario;
    document.getElementById("Peso").value = paquete.peso;
    document.getElementById("Destino").value = paquete.destino;
    document.getElementById("FormaDeEntrega").value = paquete.forma_entrega;
    document.getElementById("Calle").value = paquete.calle;
    document.getElementById("NumeroPuerta").value = paquete.numero_puerta;
    document.getElementById("Tipo").value = paquete.tipo;
}

document.addEventListener("DOMContentLoaded", function () {

    let idPaquete = sessionStorage.getItem('idProducto');
    const token = localStorage.getItem("access_token");
    const urlInfoPaquete = "http://localhost:8001/api/productos/"+idPaquete;
    const headers = {
        "Authorization": "Bearer " + token,
    };

    fetch(urlInfoPaquete, {
        method: "GET",
        headers: headers,
      })
        .then(async (response) => {
          if (response.ok) {
            return response.json(); 
          } else {
            const errorMessage = await response.text();
            console.error("Error en la solicitud:", errorMessage);
            throw new Error("Error en la solicitud");
          }
        })
        .then((data) => {
          mostrarDatosPaquete(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
});

