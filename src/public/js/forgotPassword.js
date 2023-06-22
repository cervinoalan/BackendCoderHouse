const form = document.getElementById("recoverForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  await fetch("/api/session/forgotPassword", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      window.alert(`Correo Enviado`);
      window.location.href = "/";
    })
    .catch((err) => {
      window.alert("Error al enviar correo");
    });
});

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});
