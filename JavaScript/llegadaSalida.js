document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem("access_token");

    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      };

    const urlLlegadaSalidaCamiones = "http://localhost:8001/api/va";
    const formularioVa= document.getElementById('llegadaSalida');

    formularioVa.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let almacen_id= document.getElementById("almacen_id").value;
        let vehiculo_id= document.getElementById("vehiculo_id").value;
        let ruta_id= document.getElementById("ruta_id").value;
        let horallegada= document.getElementById("hora_llegada").value;
        let horasalida = document.getElementById("hora_salida").value;
        let fecha = document.getElementById("fecha").value;
        
        let info= {
            "almacen_id": almacen_id,
            "ruta_id": ruta_id,
            "vehiculo_id": vehiculo_id,
            "horallegada": horallegada,
            "horasalida": horasalida,
            "fecha": fecha,
        };

        fetch(urlLlegadaSalidaCamiones, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(info)
        })
        .then(async response => {
          if (response.ok) {
            location.reload();
          } else {
            if (response.status === 403) {
              const errorData = await response.json(); 
              const errorMessages = Object.values(errorData).join('\n'); 

              const formattedErrorMessages = errorMessages.split('\n').join('<br>');
              
              Swal.fire({
                icon: 'error',
                title: 'Error en la solicitud',
                html: '<div style="text-align: left;">' + formattedErrorMessages + '</div>',
                footer: '<div style="text-align: left;">Errores de validación:</div>',
            });
            }
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });
});