const connection = require("../database/db");

exports.register = (req, res) => {
  const { id, nombres, apellidos, correo, fecha_nacimiento, numero_celular } =
    req.body;
  console.log(id);
  let buscar = "SELECT * FROM usuario where idusuario =" + id;

  connection.query(buscar, (error, row) => {
    console.log(row);
    if (error) {
      throw error;
    } else {
      if (row.length > 0) {
        res.send("Usuario ya esta registrado en el sistema");
      } else {
        const register =
          'INSERT INTO usuario(idusuario, nombres, apellidos, correo, fecha_nacimiento, numero_celular) VALUES("' +
          id +
          '", "' +
          nombres +
          '","' +
          apellidos +
          '","' +
          correo +
          '","' +
          fecha_nacimiento +
          '","' +
          numero_celular +
          '")';
        connection.query(register, (error) => {
          if (error) {
            throw error;
          } else {
            res.send("Usuario resgistrado");
          }
        });
      }
    }
  });
};

exports.Servicios = (req, res) => {
  const data = "SELECT * FROM  servicios";
  connection.query(data, (error, row) => {
    if (error) {
      throw error;
    } else {
      res.render("servicios", { row });
    }
  });
};

exports.config1 = (req, res) => {
  const { N_servicio, T_servicio, Costo } = req.body;
  const buscar = "SELECT * FROM servicios WHERE nombreServicio = ? ";
  connection.query(buscar, [N_servicio], (error, row) => {
    if (error) {
      throw error;
    } else {
      if (row.length > 0) {
        res.send("Servicio ya existe");
      } else {
        const register =
          "INSERT INTO servicios(nombreServicio, tipo_servicio, costo) VALUES('" +
          N_servicio +
          "', '" +
          T_servicio +
          "', '" +
          Costo +
          "')";
        connection.query(register, (error) => {
          if (error) {
            throw error;
          } else {
            const buscar1 = "SELECT * FROM servicios";
            connection.query(buscar1, (error, row) => {
              if (error) {
                throw error;
              } else {
                res.redirect("config");
                // res.send(row)
              }
            });
          }
        });
      }
    }
  });
};

exports.config = (req, res) => {
  const buscar1 = "SELECT * FROM servicios";
  connection.query(buscar1, (error, row) => {
    if (error) {
      throw error;
    } else {
      res.render("config", { row });
    }
  });
};

exports.login = (req, res) => {
  const { user, password, idRol } = req.body;
  const verificar =
    "SELECT * FROM cuenta WHERE usuario =? and contraseña =? and idRol = ? ";
  connection.query(verificar, [user, password, idRol], (error, row) => {
    if (error) {
      throw error;
    } else {
      if (row.length < 1) {
        res.send(row);
      } else {
        console.log(row);
        res.send(row);
      }
    }
  });
};

exports.elimi = (req, res) => {
  const nombre = req.params.nombres;
  console.log(nombre);
  const buscar1 = "DELETE FROM servicios WHERE nombreServicio = ?";
  connection.query(buscar1, [nombre], (error) => {
    if (error) {
      throw error;
    } else {
      res.render("config", { message: "Dato eliminado" });
    }
  });
};

exports.edit = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const buscar = "SELECT * FROM servicios WHERE idServicio = ?";
  connection.query(buscar, [id], (error, row) => {
    console.log(row);
    if (error) {
      throw error;
    } else {
      res.render("edit", { user: row[0] });
    }
  });
};

exports.editDatos = (req, res) => {
  const { id, nombre } = req.body;
  const update = "UPDATE servicios SET nombreServicio = ? WHERE idServicio = ?";
  connection.query(update, [nombre, id], (error, row) => {
    if (error) {
      throw error;
    } else {
      res.render("config", { message: "Servicio actualizado" });
    }
  });
};

exports.recuperar = (req, res) => {
  const { user, pass } = req.body;
  console.log(user, pass);
  const update = "UPDATE cuenta SET contraseña = ? WHERE usuario = ?";
  connection.query(update, [pass, user], (error, row) => {
    console.log(row);
    if (error) {
      throw error;
    } else {
      res.render("recuperar", { message: "Contraseña actualizada" });
    }
  });
};

exports.addBarber = (req, res) => {
  console.log(req.body);
  const { id, name, lastname } = req.body;
  console.log(name)
  const insert =
    "INSERT INTO barberos (idbarberos,nombre, apellidos) VALUES('" +
    id +
    "', '" +
    name +
    "', '" +
    lastname +
    "')";
  connection.query(insert, (error) => {
    if (error) {
      throw error;
    } else {
      res.render("barbero");
    }
  });
};

exports.barber = (req, res) => {
  const buscar1 = "SELECT * FROM barberos";
  connection.query(buscar1, (error, row) => {
    if (error) {
      throw error;
    } else {
      // console.log(row)
      res.render("barbero", { row });
    }
  });
};

exports.deleteBar = (req, res) => {
  const idBar = req.params.id;
  connection.query(
    "DELETE FROM barberos WHERE idbarberos = ?",
    [idBar],
    (error, row) => {
      if (error) {
        throw error;
      } else {
        res.render("barbero", { message: "Barbero eliminado" });
      }
    }
  );
};

exports.updateBar = (req, res) => {
  const idBar = req.params.id;
  connection.query(
    "SELECT * FROM barberos WHERE idbarberos = ?",
    idBar,
    (error, row) => {
      if (error) {
        throw error;
      } else {
        const ro = row[0];
        console.log(ro);
        res.render("updateBar", { ro });
      }
    }
  );
};
exports.updateBarber = (req, res) => {
  const { id, name } = req.body;
  console.log(id, name);
  connection.query(
    "UPDATE barberos set nombre = ? WHERE idbarberos = ?",
    [name, id],
    (error, row) => {
      if (error) {
        throw error;
      } else {
        res.redirect("barber");
      }
    }
  );
};
