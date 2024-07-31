if (sessionStorage.getItem("session")) {
  const idRol = JSON.parse(sessionStorage.getItem("session"));
  console.log(idRol.idRol);
  if (idRol.idRol === 1) {
    console.log("Soy hiden");
    config.classList.remove("hiden");
    barber.classList.remove("hiden");
    const ele = document.getElementById("session");
    // ele.setAttribute("style", "margin-left:500px;")
    ele.style.marginLeft = "500px";
  }
}
