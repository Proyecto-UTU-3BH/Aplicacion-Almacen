document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access_token");
  
    const urlIngresarPaquete = "http://localhost:8001/api/productos";
  
    const headers = {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    };

    const formulario = document.getElementById("ingresarPaquete");
    const calle = document.getElementById("Calle");
    const numero_puerta = document.getElementById("NumeroPuerta");
    const forma_entrega = document.getElementById("FormaDeEntrega");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let remitente= document.getElementById("Remitente").value;
        let nombre_destinatario= document.getElementById("NombreDestinatario").value;
        let peso= document.getElementById("Peso").value;
        let destino= document.getElementById("Destino").value;
        let tipo = document.getElementById("Tipo").value;
        let estado="en central";

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

        fetch(urlIngresarPaquete, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(info)
        })
        .then(async response => {
          if (response.ok) {
            console.log("Producto creado con éxito.");
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
    

});