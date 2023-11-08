function mostrarLotes(data) {

    const tbody = document.getElementById("lotes");

    let htmlToAppend = '';

    data.forEach(lote => {

        htmlToAppend += `
              <tr>
                  <td>${lote.IDLote}</td>
                  <td>${lote.matricula.toUpperCase()}</td>
                  <td>${lote.fecha}</td>
                  <td>${lote.pesoLote}</td>
                  <td>
                    <button class="ver-productos-btn" onclick="setCatID(${lote.IDLote})">Ver Productos</button>
                  </td>
              </tr>
          `;
    });

    tbody.innerHTML = htmlToAppend;

}

function setCatID(id) {
    sessionStorage.setItem("IDLote", id);
    location.href = "paquetesDeLote.html";
}


document.addEventListener("DOMContentLoaded", function () {

    let userData = JSON.parse(localStorage.getItem("userData"));
    const almacenID = userData.almacen_id

    const token = localStorage.getItem("access_token");
    const urlVerLotes = "http://localhost:8001/api/gestiona/verLotes/"+almacenID;
    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    };

    fetch(urlVerLotes, {
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
            if (data.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'No hay lotes creados',
                    text: 'No se encontraron lotes para este Almacen',
                });
            } else {
                mostrarLotes(data);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});