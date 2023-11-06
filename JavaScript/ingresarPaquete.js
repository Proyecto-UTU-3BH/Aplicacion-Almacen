function generarCodigoAleatorio(largo) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < largo; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[randomIndex];
  }
  return codigo;
}

document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access_token");

    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      };

    const urlIngresarPaquete = "http://localhost:8001/api/productos";
    const urlAlmacenamiento = "http://localhost:8001/api/almacena";

    if (sessionStorage.getItem("productoId") != null) {
        document.getElementById('id_producto').value=sessionStorage.getItem("productoId");
    }

    const codigoRastreoInput = document.getElementById('codRastreo');
    const generarCodigoButton = document.getElementById('generarCodigo');

    generarCodigoButton.addEventListener('click', function () {
      const codRastreo = generarCodigoAleatorio(6); 
      codigoRastreoInput.value = codRastreo;
    });

    const formularioPaquete = document.getElementById("ingresarPaquete");
    const formularioAlmacenamiento = document.getElementById("almacenamiento");
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
        let codRastreo= document.getElementById("codRastreo").value;
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
            "estado": estado,
            "codRastreo": codRastreo
        };

        fetch(urlIngresarPaquete, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(info)
        })
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("productoId", data.id);
            location.reload();
          } else {
            const errorData = await response.json();
             if (errorData.codRastreo && errorData.codRastreo[0] === "The cod rastreo has already been taken.") {
            Swal.fire({
                title: 'Código de Rastreo Duplicado',
                text: 'El código de rastreo ya existe. Por favor, genera otro código de rastreo.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
          }
        }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });

    formularioAlmacenamiento.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let producto_id= document.getElementById("id_producto").value;
        let almacen_id= document.getElementById("id_almacen").value;
        
        let data= {
            "producto_id": producto_id,
            "almacen_id": almacen_id,
        };

        fetch(urlAlmacenamiento, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(async response => {
          if (response.ok) {
            sessionStorage.removeItem("productoId");
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

    document.getElementById('verProductos').addEventListener('click', function () {
      window.location.href = 'homepageAlmacen.html';
    });
    

});