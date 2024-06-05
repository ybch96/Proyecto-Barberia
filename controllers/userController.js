
const connection = require('../database/db');

exports.register = (req, res) => {
    const {id, nombres, apellidos, correo, fecha_nacimiento, numero_celular} = req.body;
    console.log(id)
    let buscar = 'SELECT * FROM usuario where idusuario ='+id


    connection.query(buscar, (error, row) => {
        console.log(row)
      if(error){
       throw error
      }else {if(row.length>0){
        res.send("Usuario ya esta registrado en el sistema")
      }else{
        const register = 'INSERT INTO usuario(idusuario, nombres, apellidos, correo, fecha_nacimiento, numero_celular) VALUES("'+id+'", "'+nombres+'","'+apellidos+'","'+correo+'","'+fecha_nacimiento+'","'+numero_celular+'")'
        connection.query(register, (error) => {
            if(error){
                throw error
            }else{
                res.send("Usuario resgistrado")
            }
        })
      }
    }

    }) 

   
}

exports.Servicios = (req, res) => {
  const data = "SELECT * FROM servicios"
  connection.query(data, (error, row) => {
    // console.log(row)
    if(error){
      throw error
    }else {

      res.render("servicios", {row})
    }
  })

}

exports.config1 = (req, res) => {
  const {N_servicio, T_servicio, Costo} = req.body;
  // console.log(N_servicio)
  const buscar = "SELECT * FROM servicios WHERE nombreServicio = ? "
  // console.log(buscar)
  connection.query(buscar, [N_servicio], (error, row) => {
    // console.log(row.length)
    if(error){
      throw error
    } else{ if(row.length > 0){
      res.render("config", {message:"Ya existe un servicio con ese nombre"})
    }else{
      const register = "INSERT INTO servicios(nombreServicio, tipo_servicio, costo) VALUES('"+N_servicio+"', '"+T_servicio+"', '"+Costo+"')"
      connection.query(register, (error) => {
           if(error){
            throw error
           }else{
            const buscar1 = "SELECT * FROM servicios"
  connection.query(buscar1, (error, row) => {
  //  console.log(row)
   if(error){
     throw error
   } else {
    res.redirect("config")
   }
  })
    // res.render("config", {message:"Servicio registra con exito"})
    

          
           }
      })
    }
  }
  })
  // res.render("config")
}

exports.config = (req, res) => {
  const buscar1 = "SELECT * FROM servicios"
  connection.query(buscar1, (error, row) => {
  //  console.log(row)
   if(error){
     throw error
   } else {
    res.render("config", {row})
   }
  })
  // res.render("config")
}

exports.login = (req, res) => {
  const {usu, pass} = req.body;
  console.log(usu, pass)
  const verificar = "SELECT * FROM cuenta WHERE usuario =? AND contraseña =?"
  connection.query(verificar, [usu, pass], (error, row) => {
    console.log(verificar)
    if(error){
      throw error
    } else {
      if(row.length <= 0){
      res.render("login", {message:"Usuario  o contraseña incorrecto"}
      )
      }else{
        res.redirect("/")
      }
    }
  })
}

exports.elimi = (req, res) => {
  const nombre = req.params.nombres
  console.log(nombre)
  const buscar1 = "DELETE FROM servicios WHERE nombreServicio = ?"
  connection.query(buscar1, [nombre], (error) => {
   if(error){
     throw error
   } else {
      res.render("config",{message:"Dato eliminado"})
  //  console.log(row)

   }
  })
  
}


exports.edit = (req, res) => {
  const id = req.params.id
  console.log(id)
  const buscar = "SELECT * FROM servicios WHERE idServicio = ?"
  connection.query(buscar, [id], (error, row) => {
    console.log(row)
    if(error){
      throw error
    }else{
      res.render("edit", {user:row[0]})
    }
  })
}

exports.editDatos = (req, res) => {
  const {id, nombre} = req.body
  // console.log(id, nombre)
  const update = "UPDATE servicios SET nombreServicio = ? WHERE idServicio = ?"
  connection.query(update, [nombre, id], (error, row) => {
    // console.log(row)
    if(error){
      throw error
    }else{
      res.render("config", {message:"Servicio actualizado"})
    }
  })
}
exports.recuperar = (req, res) => {
  const {user, pass} = req.body
  console.log(user, pass)
  const update = "UPDATE cuenta SET contraseña = ? WHERE usuario = ?"
  connection.query(update, [pass, user], (error, row) => {
    console.log(row)
    if(error){
      throw error
    }else{
      res.render("recuperar", {message:"Contraseña actualizada"})
    }
  })
}