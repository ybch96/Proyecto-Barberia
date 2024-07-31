const contador = document.querySelector(".contador");
const icon = document.querySelector(".icon-cart");
const elements = document.querySelector(".elements-div");
const boton = document.querySelector(".boton");
const boton1 = document.querySelector(".servicios_div");
let info = document.querySelector(".info-cart");
let elim = document.querySelector(".eliminar");
const card = document.querySelector(".card1");
const divbarber = document.querySelector(".barbero");
const ingreso = document.querySelector("#ingreso");
const barberos = document.querySelector("#barbero");
const message = document.querySelector(".messages");
const contenidoSesion = document.querySelector(".contenidoSesion");
const session = document.querySelector(".session");
const cerrarSe = document.querySelector(".cerrarSe");
const config = document.querySelector(".config");
const barber = document.querySelector(".barber");
let productList = JSON.parse(localStorage.getItem("productos")) || [];
let barbero = [];
let total = 0;
let cantidadProducto = 0;

function ocultarCarrito() {
  elements.classList.toggle("hiden");
}
function ocultarSesion() {
  contenidoSesion.classList.toggle("hiden");
}
function cerrarSesion() {
  sessionStorage.removeItem("session");
  window.location.href = "http://localhost:5000/login";
}

function saveLocalStorage(productList) {
  const productos = JSON.stringify(productList);
  localStorage.setItem("productos", productos);
}

function agregar() {
  info.innerHTML = "";
  if (productList && productList.length > 0) {
    productList.forEach((produc) => {
      const div = document.createElement("div");
      div.classList.add("Servicios");
      div.innerHTML = `
      <span class="servicios_li1">${produc.cantidad}</span>
      <p class="servicios_li2">${produc.nombre_servicio}</p>
      <p class="servicios_li3">${produc.tipo_servicio}</p>
      <span class="servicios_li3">${produc.costo}</span>
      <button onclick="eliminar('${produc.nombre_servicio}')">Eliminar</button>
      `;
      info.appendChild(div);
    });
  }
}

function totalProductos(producto) {
  cantidadProducto = JSON.parse(localStorage.getItem("cantidadProducto")) || 0;
  total = 0;
  contador.innerHTML = "";
  if (producto) {
    cantidadProducto += 1;
    localStorage.setItem("cantidadProducto", JSON.stringify(cantidadProducto));
    console.log(cantidadProducto);
    contador.innerHTML = `
          <span>${cantidadProducto}</span>`;
  }
}

function eliminar(servicio) {
  const a = JSON.parse(localStorage.getItem("productos"));
  cantidadProducto = JSON.parse(localStorage.getItem("cantidadProducto"));
  console.log(servicio);
  if (a) {
    const b = a.map((ele) => {
      if (ele.nombre_servicio === servicio) {
        ele.cantidad--;
        return ele;
      } else {
        return ele;
      }
    });
    productList = [...b];
    if (productList) {
      const produ = productList.filter((element) => element.cantidad !== 0);
      productList = [...produ];
    }
  }

  if (cantidadProducto > 0) {
    cantidadProducto -= 1;
    localStorage.setItem("cantidadProducto", JSON.stringify(cantidadProducto));
    cantidadProducto = JSON.parse(localStorage.getItem("cantidadProducto"));
    console.log(cantidadProducto);
    contador.innerHTML = "";
    contador.innerHTML = `
      <span>${cantidadProducto}</span>`;
  }

  saveLocalStorage(productList);
  agregar();

  console.log(productList);
}

// Asignacion de eventos
if (ingreso) {
  ingreso.addEventListener("submit", (e) => {
    e.preventDefault();
    const loggear = {
      user: ingreso.usu.value,
      password: ingreso.pass.value,
      idRol: ingreso.rol.value,
    };
    const loggearStringify = JSON.stringify(loggear);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "aplication/json" },
      body: loggearStringify,
    }).then((data) =>
      data.json().then((datos) => {
        console.log(datos);
        if (datos.length < 1) {
          message.innerHTML = `<p>Usuario o contraseña incorrecto</p>`;
        } else {
          const { usuario, contraseña, idRol } = datos[0];
          const datosStringify = JSON.stringify({ usuario, contraseña, idRol });
          sessionStorage.setItem("session", datosStringify);
          location.href = "http://localhost:5000/servicios";
        }
      })
    );
  });
}

if (barberos) {
  barberos.addEventListener("submit", (e) => {
    e.preventDefault();
    const barbero = {
      id: barberos.id.value,
      name: barberos.name.value,
      lastname: barberos.lastname.value,
    };
    const barberoStringify = JSON.stringify(barbero);

    fetch("http://localhost:5000/addbarber", {
      method: "POST",
      headers: { "Content-Type": "aplication/json" },
      body: barberoStringify,
    })
    // .then((data) =>
    //   data.json().then((datos) => {
    //     console.log(datos);
    //     const { usuario, contraseña, idRol } = datos[0];
    //     const datosStringify = JSON.stringify({ usuario, contraseña, idRol });
    //     sessionStorage.setItem("session", datosStringify);
    //     location.href = "http://localhost:5000/servicios";
    //   })
    // );
  });
}

icon.addEventListener("click", (e) => {
  console.log(e.target);
  ocultarCarrito();
});

if (boton1) {
  boton1.addEventListener("click", (e) => {
    console.log(productList);
    if (JSON.parse(sessionStorage.getItem("session"))) {
      if (e.target.classList.contains("boton1")) {
        const i = e.target.parentElement;
        const producto = {
          cantidad: 1,
          nombre_servicio: i.querySelector(".servicios_li1").textContent,
          tipo_servicio: i.querySelector(".servicios_li2").textContent,
          costo: i.querySelector(".servicios_li3").textContent,
        };

        const exist = productList.some(
          (produc) => produc.nombre_servicio === producto.nombre_servicio
        );
        if (exist) {
          const product = productList.map((product) => {
            if (product.nombre_servicio === producto.nombre_servicio) {
              product.cantidad++;
              return product;
            } else {
              return product;
            }
          });
          productList = [...product];
        } else {
          productList = [...productList, producto];
        }
        saveLocalStorage(productList);
        agregar();
        totalProductos(producto);
      }
    } else {
      location.href = "http://localhost:5000/login";
    }
  });
}

if (card) {
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("boton")) {
      const ele = e.target.parentElement;
      const barber = [
        {
          idBarbero: ele.querySelector(".servicios_li1").textContent,
          nombre: ele.querySelector(".servicios_li2").textContent,
          apellido: ele.querySelector(".servicios_li3").textContent,
        },
      ];
      const barberoStringify = JSON.stringify(barber);
      console.log(barberoStringify);
      localStorage.setItem("barberos", barberoStringify);
      const barberoStorage = JSON.parse(localStorage.getItem("barberos")) || [];
      barbero1.innerHTML = "";
      barbero1.innerHTML = `
      <p>${barberoStorage[0].nombre} ${barberoStorage[0].apellido}</p>
      <button onclick="removeBarber()">Eliminar</button>
      `;
    }
  });
}

session.addEventListener("click", () => {
  ocultarSesion();
});
cerrarSe.addEventListener("click", () => {
  cerrarSesion();
});
