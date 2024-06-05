const info1 = document.querySelector(".info-cart")
const contador1 = document.querySelector(".contador");
const Total = document.querySelector(".total");

function contadores(){
    const cantidadProducto = JSON.parse(localStorage.getItem("cantidadProducto"))
    console.log(cantidadProducto)
    contador1.innerHTML=`
    <span>${cantidadProducto}</span>`
}

function total1(){
    const productLocalStorage = JSON.parse(localStorage.getItem("productos"))
   let total = 0 
 
    if(productLocalStorage){
    productLocalStorage.forEach(ele => {
       // console.log(ele.cantidad)
    contador1.innerHTML =""
    
       total += ele.cantidad * ele.costo
      Total.innerHTML = `<spam>${total}</span>`
      
    })
       
    
 
    }
}
 
 

function agregar(){
    const productLocalStorage = JSON.parse(localStorage.getItem("productos")) 
    console.log(productLocalStorage)
    if(productLocalStorage == null){
        console.log("Hola")
        const divN = document.createElement("div")
        divN.innerHTML=`
        <p>No hay productos en tu carrito</p>`
        info1.appendChild(divN)
    }else{ info1.innerHTML=""
    productLocalStorage.forEach(produc =>{
    const div = document.createElement("div");
    div.classList.add("div");
    div.innerHTML =`
    <span class="servicios_li1">${ produc.cantidad}</span>
    <p class="servicios_li1">${ produc.nombre_servicio}</p>
    <p class="servicios_li2">${ produc.tipo_servicio}</p>
    <span class="servicios_li3">${ produc.costo}</span>
    <span class="servicios_li3">Total ${produc.cantidad*produc.costo}</span>
    <button onclick="eliminar('${ produc.nombre_servicio}')">Eliminar</button>
    `
    info1.appendChild(div)
    
    })
    
    }

    }


 contadores()
 agregar()
 total1()


