function validateForm(){
const name = document.getElementById("nombre").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const errorMsg = document.getElementById("error-msg");
errorMsg.textContent = "";

    if (nombre === "" || email === "" || password === ""){
        errorMsg.textContent = "Todos los campos son obligatorios";
        return false;
    } else if (nombre.length < 6){
        const div = document.createElement("div");
        div.classList.add("error-message");
            div.innerHTML = `
            <h5> Su nombre y apellido deben tener al menos 6 caracteres <h5>
            `;
            document.getElementById("nombre").after(div);
            return false;
    } else if (email.length < 11){
        const div = document.createElement("div");
        div.classList.add("error-message");
        div.innerHTML = `
        <h5> Su mail debe tener al menos 11 caracteres <h5>
        `;
        document.getElementById("email").after(div); // Agregar el mensaje de error después del campo "email"
        return false;
} else if (password.length < 10){
    const div = document.createElement("div");
    div.classList.add("error-message");
    div.innerHTML = `
    <h5> Su contraseña debe tener al menos 10 caracteres <h5>
    `;
    document.getElementById("password").after(div); // Agregar el mensaje de error después del campo "password"
    return false;
}
return true;
}