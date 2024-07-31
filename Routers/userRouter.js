const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controllers/userController");

// Router para renderizar vistas

// configuracion de la ruta

router.get("/", function (req, res) {
  res.render("index");
});
router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/register", function (req, res) {
  res.render("register");
});
router.get("/quienes-somos", function (req, res) {
  res.render("quienes-somos");
});
router.get("/recuperar", function (req, res) {
  res.render("recuperar");
});
// router.get("/updateBar", function (req, res) {
//   res.render("updateBar");
// });

// router.get("/barberia", function (req, res) {
//   res.render("barberos");
// });

// Rutas para manejo de peticiones
router.get("/barber", userController.barber);
router.post("/validar", userController.register);
router.get("/servicios", userController.Servicios);
router.get("/config", userController.config);
router.post("/config", userController.config1);
router.post("/login", userController.login);
router.get("/:nombres", userController.elimi);
router.get("/edit/:id", userController.edit);
router.post("/edit", userController.editDatos);
router.post("/recuperar", userController.recuperar);
router.post("/addbarber", userController.addBarber);
router.get("/deleteBar/:id", userController.deleteBar);
router.get("/updateBar/:id", userController.updateBar);
router.post("/updateBarber", userController.updateBarber);

module.exports = router;
