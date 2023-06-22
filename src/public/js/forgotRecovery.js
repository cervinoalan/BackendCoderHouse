const params = new URLSearchParams(window.location.search);
const token = params.get("token");
console.log(token);

const resetPasswordForm = document.getElementById("forgotRecoveryForm");

resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  await fetch(`/api/session/forgotrecovery/${token}`, {
    method: "POST",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.alert();
      window.location.href = "/";
    })
    .catch((err) => {
      window.alert("Error al cambiar la contraseña");
    })
});


const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});
