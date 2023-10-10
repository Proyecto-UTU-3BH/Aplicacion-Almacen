document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem("access_token");

    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      };

    const urlAsignarLote = "http://localhost:8001/api/gestiona";
    const formularioLote= document.getElementById('asignarLote');

    let textarea = document.getElementById('producto_ids');
    
    textarea.addEventListener('focus', function () {
        if (textarea.value.trim() === 'Ingrese los ID de Producto separados por un Enter, ejemplo:\n1\n2\n3') {
            textarea.value = '';
        }
    });
    
    textarea.addEventListener('blur', function () {
        if (textarea.value.trim() === '') {
            textarea.value = 'Ingrese los ID de Producto separados por un Enter, ejemplo:\n1\n2\n3';
        }
    });

    formularioLote.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let IDLote= document.getElementById("id_lote").value;
        let producto_ids= document.getElementById("producto_ids").value;
        let vehiculo_id= document.getElementById("id_vehiculo").value;
        let usuario_id= document.getElementById("id_usuario").value;
        let fecha = document.getElementById("fecha").value;
        
        let info= {
            "IDLote": IDLote,
            "usuario_id": usuario_id,
            "fecha": fecha,
            "producto_ids": producto_ids,
            "vehiculo_id": vehiculo_id,
        };

        fetch(urlAsignarLote, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(info)
        })
        .then(async response => {
          if (response.ok) {
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
