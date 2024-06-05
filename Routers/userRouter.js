const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Router para renderizar vistas



//configuracion de la ruta
router.get('/', function(req,res){
    res.render('index')
})

router.get('/index',function(req,res){
    res.render('index')
})
router.get('/login',function(req,res){
    res.render('login')
})

router.get('/register',function(req,res){
    res.render('register')
})
router.get('/quienes-somos',function(req,res){
    res.render('quienes-somos')
})
router.get('/recuperar',function(req,res){
    res.render('recuperar')
})
// app.get('/servicios',function(req,res){
//     res.render('servicios')
// })

// Rutas para manejo de peticiones
router.post('/validar', userController.register);
router.get("/servicios", userController.Servicios)
router.get("/config", userController.config)
router.post("/config", userController.config1)
router.post("/login", userController.login)
router.get("/:nombres", userController.elimi)
// router.get("/servicios/:servi", userController.add)
router.get("/edit/:id", userController.edit)
router.post("/edit", userController.editDatos)
router.post("/recuperar", userController.recuperar)

// router.get("servicios/nombres", userController.add)


module.exports = router;
