function mostrarDatosPaquete (paquete) {
    document.getElementById("Remitente").value = paquete.remitente;
    document.getElementById("NombreDestinatario").value = paquete.nombre_destinatario;
    document.getElementById("Estado").value = paquete.estado;
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
        "Content-Type": "application/json"
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

        const formularioPaquete = document.getElementById("modificarPaquete");
        const urlModificarPaquete = "http://localhost:8001/api/productos/"+idPaquete;
        const calle = document.getElementById("Calle");
        const numero_puerta = document.getElementById("NumeroPuerta");
        const forma_entrega = document.getElementById("FormaDeEntrega");
    
        formularioPaquete.addEventListener("submit", function (event) {
            event.preventDefault(); 
    
            let remitente= document.getElementById("Remitente").value;
            let nombre_destinatario= document.getElementById("NombreDestinatario").value;
            let peso= document.getElementById("Peso").value;
            let destino= document.getElementById("Destino").value;
            let tipo = document.getElementById("Tipo").value;
            let estado=document.getElementById("Estado").value;
    
            if (forma_entrega.value === "reparto") {
                if (calle.value.trim() === "" || numero_puerta.value.trim() === "") {
                    Swal.fire({
                        title: 'Campos faltantes',
                        text: 'Por favor complete los campos de "Calle" y "Número de puerta" para el reparto.',
                        icon: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                    return; 
                }
            }
            
            let info= {
                "remitente": remitente,
                "destino": destino,
                "tipo": tipo,
                "nombre_destinatario": nombre_destinatario,
                "peso": peso,
                "calle": calle.value,
                "numero_puerta": numero_puerta.value,
                "forma_entrega": forma_entrega.value,
                "estado": estado
            };
    
            fetch(urlModificarPaquete, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(info)
            })
            .then(async response => {
              if (response.ok) {
                const data = await response.json();
                location.reload();
              } else {
                const errorMessage = await response.text(); 
                console.error("Error en la solicitud:", errorMessage);
              }
            })
            .catch(error => {
              console.error("Error:", error);
            });
        });
        
        document.getElementById('redirigirButton').addEventListener('click', function(){
            location.href="homepageAlmacen.html";
        })
});

