require('dotenv').config();
const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3')
const util = require('./util');
const config = require('../config');
const alumnos = require('./data/alumnos');
const profesores = require('./data/profesores');

const app = express();
const s3 = new aws.S3();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'aws-api-img-bucket',
        key: function(req, file, cb){
            console.log(file);
            cb(null, file.originalname);
        }
    })
})

/**********ROUTES**********/
app.get('/', (req, res) => {
    res.send('Welcome to the AWS REST API');
});

app.get('/alumnos', async (req, res) => {
    try{
        res.status(200);
        res.json(await alumnos.getAll());
    }
    catch(err){
        console.error('Error al obtener los alumnos', err.message);
        res.status(500);
    }
});

app.post('/alumnos', async (req, res) => {
    const alumno = req.body;
    if(!alumno.nombres){
        res.status(400).json({"message": "El nombre del alumno debe estar llenado"});
    }
    else if(!alumno.apellidos){
        res.status(400).json({"message": "El apellido del alumno debe estar llenado"});
    }
    else if(!alumno.matricula){
        res.status(400).json({"message": "La matrícula del alumno debe estar llenada"});
    }
    else if(!alumno.promedio){
        res.status(400).json({"message": "El promedio del alumno debe estar llenado"});
    }
    else{
        try{
            const resultado = await alumnos.save(alumno);
            res.status(201).json({id: resultado.insertId});
        }
        catch(err){
            console.error('Error al insertar alumno', err.message);
            res.status(500);
        }
    }
});

app.post('/alumnos/:id/fotoPerfil', upload.array('foto', 1), async (req, res) => {
    const alumno = req.body;
    alumno.id = req.params.id;
    alumno.fotoPerfil = req.files;
    try{
        const resultado = await alumnos.savePhoto(alumno);
        if(resultado.affectedRows == 1){
            res.status(200).json('Se ha insertado la foto del alumno: '+alumno.fotoPerfil[0].location);
        }else{
            res.status(200).json('No se encontró el alumno con id '+id);
        }
    }
    catch(err){
        console.error('Error al insertar alumno', err.message);
        res.status(500);
    }
});

app.get('/alumnos/:id', async(req, res) => {
    const id = req.params.id;
    if(!util.isInt(id)){
        res.status(400).json({"message": "El id debe ser numérico"});
    }else{
        try{
            res.status(200).json(await alumnos.get(id));
        }
        catch(err){
            console.error('Error al obtener alumno', err.message);
            res.status(500);
        }
    }
});


app.put('/alumnos/:id', async (req, res) => {
    const id = req.params.id;
    const alumno = req.body;
    alumno.id = id;
    if(!util.isInt(id)){
        res.status(400).json({"message": "El id debe ser numérico"});
    }
    else if(!alumno.nombres){
        res.status(400).json({"message": "El nombre del alumno debe estar llenado"});
    }
    else if(!alumno.apellidos){
        res.status(400).json({"message": "El apellido del alumno debe estar llenado"});
    }
    else if(!alumno.matricula){
        res.status(400).json({"message": "La matrícula del alumno debe estar llenada"});
    }
    else if(!alumno.promedio){
        res.status(400).json({"message": "El promedio del alumno debe estar llenado"});
    }
    else if(!util.isFloat(alumno.promedio)){
        res.status(400).json({"message": "El promedio del alumno debe ser numérico"});
    }
    else{
        try{
            const resultado = await alumnos.update(alumno);
            if(resultado.affectedRows == 1){
                res.status(200).json('Se ha actualizado el alumno');
            }else{
                res.status(200).json('No se encontró el alumno con id '+id);
            }
        }
        catch(err){
            console.error('Error al actualizar alumno', err.message);
            res.status(500);
        }
    }
});

app.delete('/alumnos/:id', async (req, res) => {
    const id = req.params.id;
    if(!util.isInt(id)){
        res.status(400).json({"message": "El id debe ser numérico"});
    }else{
        try{
            const resultado = await alumnos.remove(id);
            if(resultado.affectedRows == 1){
                res.status(200).json('Se ha eliminado el alumno');
            }else{
                res.status(200).json('No se encontró el alumno con id '+id);
            }
        }
        catch(err){
            console.error('Error al actualizar alumno', err.message);
            res.status(500);
        }
    }
});

app.get('/profesores', async (req, res) => {
    try{
        res.status(200);
        res.json(await profesores.getAll());
    }
    catch(err){
        console.error('Error al obtener los profesores', err.message);
        res.status(500);
    }
});

app.post('/profesores', async (req, res) => {
    const profesor = req.body;
    if(!profesor.nombres){
        res.status(400).json({"message": "El nombre del profesor debe estar llenado"});
    }
    else if(!profesor.apellidos){
        res.status(400).json({"message": "El apellido del profesor debe estar llenado"});
    }
    else if(!profesor.numeroEmpleado){
        res.status(400).json({"message": "El numero del empleado del profesor debe estar llenado"});
    }
    else if(!util.isInt(profesor.numeroEmpleado)){
        res.status(400).json({"message": "El numero del empleado del profesor debe ser numérico"});
    }
    else if(!profesor.horasClase){
        res.status(400).json({"message": "El promedio del profesor debe estar llenado"});
    }
    else if(!util.isFloat(profesor.horasClase)){
        res.status(400).json({"message": "Las horas de clase deben ser numéricas"});
    }
    else{
        try{
            const resultado = await profesores.save(profesor);
            res.status(201).json({id: resultado.insertId});
        }
        catch(err){
            console.error('Error al insertar profesor', err.message);
            res.status(500);
        }
    }
});

app.get('/profesores/:id', async(req, res) => {
    const id = req.params.id;
    if(!util.isInt(id)){
        res.status(400).json({"message": "El id debe ser numérico"});
    }else{
        try{
            res.status(200).json(await profesores.get(id));
        }
        catch(err){
            console.error('Error al obtener profesor', err.message);
            res.status(500);
        }
    }
});

app.put('/profesores/:id', async (req, res) => {
    const id = req.params.id;
    const profesor = req.body;
    profesor.id = id;
    if(!profesor.nombres){
        res.status(400).json({"message": "El nombre del profesor debe estar llenado"});
    }
    else if(!profesor.apellidos){
        res.status(400).json({"message": "El apellido del profesor debe estar llenado"});
    }
    else if(!profesor.numeroEmpleado){
        res.status(400).json({"message": "El numero del empleado del profesor debe estar llenado"});
    }
    else if(!util.isInt(profesor.numeroEmpleado)){
        res.status(400).json({"message": "El numero del empleado del profesor debe ser numérico"});
    }
    else if(!profesor.horasClase){
        res.status(400).json({"message": "El promedio del profesor debe estar llenado"});
    }
    else if(!util.isFloat(profesor.horasClase)){
        res.status(400).json({"message": "Las horas de clase deben ser numéricas"});
    }
    else{
        try{
            const resultado = await profesores.update(profesor);
            if(resultado.affectedRows == 1){
                res.status(200).json('Se ha actualizado el profesor');
            }else{
                res.status(200).json('No se encontró el profesor con id '+id);
            }
        }
        catch(err){
            console.error('Error al actualizar profesor', err.message);
            res.status(500);
        }
    }
});

app.delete('/profesores/:id', async (req, res) => {
    const id = req.params.id;
    if(!util.isInt(id)){
        res.status(400).json({"message": "El id debe ser numérico"});
    }else{
        try{
            const resultado = await profesores.remove(id);
            if(resultado.affectedRows == 1){
                res.status(200).json('Se ha eliminado el profesor');
            }else{
                res.status(200).json('No se encontró el profesor con id '+id);
            }
        }
        catch(err){
            console.error('Error al actualizar profesor', err.message);
            res.status(500);
        }
    }
});

app.listen(8080, () => console.log('Listening on port 8080'));
