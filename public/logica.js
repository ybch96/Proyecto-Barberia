/* eslint-disable no-unused-vars */
const contador = document.querySelector(".contador");
const icon = document.querySelector(".icon-cart")
const elements = document.querySelector(".elements-div")
const boton = document.querySelector(".boton")
const boton1 = document.querySelector(".servicios_div")
let info = document.querySelector(".info-cart")
let elim = document.querySelector(".eliminar")
let productList =[];
let total = 0;
let cantidadProducto = 0;


function ocultarCarrito(){
   elements.classList.toggle("hiden")
}

   
function saveLocalStorage(productList){
   const productos = JSON.stringify(productList)
   localStorage.setItem("productos", productos)
}


function  agregar(){
   info.innerHTML=""
   const productLocalStorage = JSON.parse(localStorage.getItem("productos")) || []
   productLocalStorage.forEach(produc =>{
      const div = document.createElement("div");
      div.classList.add("div");
      div.innerHTML =`
      <span class="servicios_li1">${ produc.cantidad}</span>
      <p class="servicios_li1">${ produc.nombre_servicio}</p>
      <p class="servicios_li2">${ produc.tipo_servicio}</p>
      <span class="servicios_li3">${ produc.costo}</span>
      <button onclick="eliminar('${ produc.nombre_servicio}')">Eliminar</button>
      `
      info.appendChild(div)
   })
}

function total1(producto){
   const productLocalStorage = JSON.parse(localStorage.getItem("productos"))
   total = 0 
   if(productLocalStorage){
      productLocalStorage.forEach(ele => {
        contador.innerHTML =""
        if(producto && ele.nombre_servicio === producto.nombre_servicio){
           cantidadProducto+= 1
           localStorage.setItem("cantidadProducto",JSON.stringify(cantidadProducto))
          // console.log(cantidadProducto)
           contador.innerHTML=`
          <span>${cantidadProducto}</span>`
         }
        total += ele.cantidad * ele.costo
     
     
      })
      
   

   }


}

function eliminar(servicio) {
   const a = JSON.parse(localStorage.getItem("productos"))
   if(a){
      const b = a.map(ele =>{
         if(ele.nombre_servicio === servicio){
            ele.cantidad--
            return ele 
         }else{
            return ele
         }

      })
      productList = [...b]
     if(productList){
        const produ = productList.filter(element =>element.cantidad !== 0
         )
         productList = [...produ]
      }
   }

   if(cantidadProducto > 0 ){
      contador.innerHTML =""
      cantidadProducto -=1
      localStorage.setItem("cantidadProducto", JSON.stringify(cantidadProducto))
      cantidadProducto = JSON.parse(localStorage.getItem("cantidadProducto"))
      console.log(cantidadProducto)
      contador.innerHTML=`
      <span>${cantidadProducto}</span>`
   }
  
   saveLocalStorage(productList)
   // total1() 
   agregar()

   console.log(productList)
       
}


icon.addEventListener("click", (e) => {
   console.log(e.target)
   ocultarCarrito()
})

if(boton1){
   boton1.addEventListener("click", (e) => {
  if(e.target.classList.contains("boton1")){
     const i = e.target.parentElement
     const producto = {
             cantidad:1,
             nombre_servicio: i.querySelector(".servicios_li1").textContent,
             tipo_servicio: i.querySelector(".servicios_li2").textContent,
             costo : i.querySelector(".servicios_li3").textContent
      }
   
      const exist = productList.some(produc => 
            // console.log(produc.nombre_servicio+"soy el mismo servicio"+producto.nombre_servicio)
            produc.nombre_servicio ===  producto.nombre_servicio
          
         )
      if(exist){
           const product = productList.map(product => {
            if( product.nombre_servicio === producto.nombre_servicio){
                product.cantidad++
               return product
            }else{
                  return product
               }
            })
            console.log(product)
               productList = [...product]
           }else{
                 productList = [...productList, producto]
   
               }
            // console.log(productList)
         saveLocalStorage(productList)
         agregar()
         total1(producto) 
   }
   })
         
}


      