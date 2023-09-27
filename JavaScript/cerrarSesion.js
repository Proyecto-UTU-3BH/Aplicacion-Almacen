document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access_token");
    if (token==null){
        location.href="index.html";
    }

    const cerrarSesion = document.getElementById("logOut");
    
    cerrarSesion.addEventListener("click", () => {

        const headers = {
            "Authorization": "Bearer " + token
        };

        fetch("http://localhost:8000/api/logout", {
            method: "GET",
            headers: headers
        })
        .then((response) => {
            if (response.ok) {
                localStorage.removeItem("access_token");
                location.href = "index.html";
            } else {
                console.error("Error en la solicitud de cierre de sesión.");
            }
        })
        .catch((error) => {
            console.error("Error de red: ", error);
        });
    });
});
