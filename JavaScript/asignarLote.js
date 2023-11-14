function mostrarVehiculos (data) {

  const tbody = document.getElementById("vehiculos");

  let htmlToAppend = '';

  data.forEach(vehiculo => {
      htmlToAppend += `
          <tr>
              <td>${vehiculo.id}</td>
              <td>${vehiculo.matricula.toUpperCase()}</td>
              <td>${vehiculo.capacidad}</td>
              <td>${vehiculo.estado}</td>
              <td>
                  <button class="btn btn-primary" data-id="${vehiculo.id}">Seleccionar</button>
              </td>
          </tr>
      `;
  });

  tbody.innerHTML = htmlToAppend;

  eventoBotones();

}

function eventoBotones(){

  const inputIdVehiculo = document.getElementById("id_vehiculo");

  const botones = document.querySelectorAll("button[data-id]");
    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            const idVehiculo = this.getAttribute("data-id");
            inputIdVehiculo.value = idVehiculo;

            var modalVehiculos = document.querySelector('#miModal')
            var modal = bootstrap.Modal.getOrCreateInstance(modalVehiculos)
            modal.hide();
        });
    });
}

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
        if (textarea.value.trim() === 'Ingrese los ID de Producto separados por un Enter, ejemplo:\n1\n2\n3' || textarea.value.trim() === 'Enter Product IDs separated by an Enter, for example:\n1\n2\n3') {
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

    document.getElementById('modal').addEventListener('click', function () {

      const urlVerVehiculos = "http://localhost:8001/api/vehiculos";

      fetch(urlVerVehiculos, {
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
          mostrarVehiculos(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    });
});
