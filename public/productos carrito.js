const info1 = document.querySelector(".info-cart");
const contador1 = document.querySelector(".contador");
const Total = document.querySelector(".total1");
const barbero1 = document.querySelector(".barbero");

function agregar() {
  const productLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
  console.log(productLocalStorage);
  if (productLocalStorage.length < 1 ) {
    info1.innerHTML = "";
    const divN = document.createElement("div");
    divN.innerHTML = `
        <p>No hay productos en tu carrito</p>`;
    info1.appendChild(divN);
  } else {
    console.log(productLocalStorage)
    if(productLocalStorage && productLocalStorage.length > 0){
    info1.innerHTML = "";
    productLocalStorage.forEach((produc) => {
      const div = document.createElement("div");
      div.classList.add("Servicios");
      div.innerHTML = `
    <span class="servicios_li1">${produc.cantidad}</span>
    <p class="servicios_li2">${produc.nombre_servicio}</p>
    <p class="servicios_li3">${produc.tipo_servicio}</p>
    <button class="botonEliminar" onclick="eliminar('${produc.nombre_servicio}')">Eliminar</button>
    `;
      info1.appendChild(div);
    });
  }
  }
contadores()
total1();
}

function contadores() {
  const cantidadProducto = JSON.parse(localStorage.getItem("cantidadProducto")) || 0;
  contador1.innerHTML = ""
  contador1.innerHTML = `
    <span>${cantidadProducto}</span>`;
}

function total1() {
  const productLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
  let total = 0;
  if (productLocalStorage.length > 0) {
    productLocalStorage.forEach((ele) => {
      Total.innerHTML = "";
      total += ele.cantidad * ele.costo;
      Total.innerHTML = `<spam>${total}</span>`;
    });
  
}else{
    Total.innerHTML = "$"+ 0;
}
}

function removeBarber(){
  localStorage.removeItem("barberos")
  barbero1.innerHTML = ""
}

function showBarber(){
  const barberoStorage = JSON.parse(localStorage.getItem("barberos")) || []
  if(barberoStorage && barberoStorage.length > 0){
    const {nombre, apellido} = barberoStorage[0]
  barbero1.innerHTML = ""
  const divBarber = document.createElement("div") 
  divBarber.classList.add("divBarber")
  divBarber.innerHTML =`
  <p class = "nameBarber">${nombre} ${apellido}</p>
  <button onclick="removeBarber()">Eliminar</button>
  `
  barbero1.appendChild(divBarber)
  }
}

function clearLocalStorage(){
  const productLocalStorage = JSON.parse(localStorage.getItem("productos")) || [];
  if(productLocalStorage.length < 1){
    localStorage.removeItem("cantidadProducto")
  }
}
showBarber();
agregar();
clearLocalStorage();

