const { json } = require('express');
const express = require('express');
const app = express();
let alumnos = require('./data/alumnos');
let profesores = require('./data/profesores');

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Welcome to the AWS REST API');
});

app.get('/alumnos', (req, res) => {
    res.status(200).json(alumnos);
});

app.post('/alumnos', (req, res) => {
    const alumno = req.body;
    if(!alumno.nombre){
        res.status(500).json({"message": "El nombre del alumno debe estar llenado"});
    }
    else if(!alumno.apellido){
        res.status(500).json({"message": "El apellido del alumno debe estar llenado"});
    }
    else if(!alumno.edad){
        res.status(500).json({"message": "La edad del alumno debe estar llenada"});
    }
    else if(alumno.edad < 0){
        res.status(500).json({"message": "La edad del alumno debe ser numérica"});
    }
    else if(!alumno.licenciatura){
        res.status(500).json({"message": "La licenciatura del alumno debe estar llenada"});
    }
    else if(!alumno.semestre){
        res.status(500).json({"message": "El semestre del alumno debe estar llenado"});
    }
    else if(alumno.semestre < 0){
        res.status(500).json({"message": "El semestre del alumno debe ser numérico"});
    }else{
        alumno.id = alumnos.pop().id + 1;
        alumnos.push(alumno);
        res.status(201).json({"message": "Alumno creado satisfactoriamente con id "+alumno.id});
    }
});

app.get('/alumnos/:id', (req, res) => {
    const id = req.params.id;
    const alumno = alumnos.find(alumno => alumno.id === id);
    if(alumno){
        res.status(200).json(alumno);
    }else{
        res.status(404).json({
            'message': 'Alumno no encontrado'
        });
    }
});

app.put('/alumnos/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const alumno = alumnos.find(alumno => alumno.id === id);
    const index = alumnos.findIndex(alumno => alumno.id === id);
    if(alumno){
        const nuevoAlumno = req.body;
        if(!nuevoAlumno || nuevoAlumno.edad < 0){
            res.status(500).json({"message": "La edad del alumno debe ser numérica"});
        }
        else if(!nuevoAlumno || nuevoAlumno.semestre < 0){
            res.status(500).json({"message": "El semestre del alumno debe ser numérico"});
        }else{
            alumnos[index] = nuevoAlumno;
            res.status(201).json({"message": "Alumno creado satisfactoriamente con id "+alumno.id});
        }
    }else{
        res.status(404).json({
            'message': 'Alumno no encontrado'
        });
    }
});

app.delete('/alumnos/:id', (req, res) => {
    const id = req.params.id;
    const alumno = alumnos.find(alumno => alumno.id === id);
    if(alumno){
        alumnos = alumnos.map(alumno => alumno.id !== id);
        res.status(200).json(alumno);
    }else{
        res.status(404).json({
            'message': 'Alumno no encontrado'
        });
    }
});

app.get('/profesores', (req, res) => {
    res.status(200).json(profesores);
});

app.post('/profesores', (req, res) => {
    const profesor = req.body;
    if(!profesor.nombre){
        res.status(500).json({"message": "El nombre del profesor debe estar llenado"});
    }
    else if(!profesor.apellido){
        res.status(500).json({"message": "El apellido del profesor debe estar llenado"});
    }
    else if(!profesor.edad){
        res.status(500).json({"message": "La edad del profesor debe estar llenada"});
    }
    else if(profesor.edad < 0){
        res.status(500).json({"message": "La edad del profesor debe ser numérica"});
    }
    else if(!profesor.asignatura){
        res.status(500).json({"message": "La licenciatura del profesor debe estar llenada"});
    }
    else if(!profesor.años_servicio){
        res.status(500).json({"message": "Los años de servicio del profesor debe estar llenados"});
    }
    else if(profesor.años_servicio < 0){
        res.status(500).json({"message": "Los años de servicio del profesor deben ser numéricos"});
    }
    else{
        profesor.id = profesores.pop().id + 1;
        profesores.push(profesor);
        res.status(201).json({"message": "Profesor creado satisfactoriamente con id "+profesor.id});
    }
});

app.get('/profesores/:id', (req, res) => {
    const id = req.params.id;
    const profesor = profesores.find(profesor => profesor.id === id);
    if(profesor){
        res.status(200).json(profesor);
    }else{
        res.status(404).json({
            'message': 'Profesor no encontrado'
        });
    }
});

app.put('/profesores/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const profesor = profesores.find(profesor => profesor.id === id);
    const index = profesores.findIndex(profesor => profesor.id === id);
    if(profesor){
        const nuevoProfesor = req.body;
        if(!nuevoProfesor || nuevoProfesor.edad < 0){
            res.status(500).json({"message": "La edad del profesor debe ser numérica"});
        }
        else if(!nuevoProfesor || nuevoProfesor.semestre < 0){
            res.status(500).json({"message": "Los años de servicio del profesor deben ser numéricos"});
        }else{
            profesores[index] = nuevoProfesor;
            res.status(201).json({"message": "Profesor creado satisfactoriamente con id "+profesor.id});
        }
    }else{
        res.status(404).json({
            'message': 'Profesor no encontrado'
        });
    }
});

app.delete('/profesor/:id', (req, res) => {
    const id = req.params.id;
    const profesor = profesores.find(profesor => profesor.id === id);
    if(profesor){
        profesores = profesores.map(profesor => profesor.id !== id);
        res.status(200).json(profesor);
    }else{
        res.status(404).json({
            'message': 'Alumno no encontrado'
        });
    }
});

app.listen(80, () => console.log('Listening on port 80'));
