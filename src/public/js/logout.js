const logoutButton = document.getElementById("btnLogout");

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/api/session/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      window.alert(`Hasta pronto`);
      window.location.href = "/";
    })
    .catch((err) => {
      window.alert("Error al cerrar sesion");
    });
});
