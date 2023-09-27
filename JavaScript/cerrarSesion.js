document.addEventListener("DOMContentLoaded", function () {

    const cerrarSesion = document.getElementById("logOut");
    
    cerrarSesion.addEventListener("click", () => {
        
        const accessToken = localStorage.getItem("access_token");

        const headers = {
            "Authorization": "Bearer " + accessToken
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
