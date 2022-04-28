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
    else if(alumno.semestre < 0){
        res.status(400).json({"message": "El promedio del alumno debe ser numérico"});
    }else{
        //alumno.id = alumnos.pop().id + 1;
        alumnos.push(alumno);
        res.status(201).json({"message": "Alumno creado satisfactoriamente con id "+alumno.id});
    }
});

app.get('/alumnos/:id', (req, res) => {
    const id = req.params.id;
    const alumno = alumnos.find(alumno => alumno.id == id);
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
    const alumno = alumnos.find(alumno => alumno.id == id);
    const index = alumnos.findIndex(alumno => alumno.id == id);
    if(alumno){
        const nuevoAlumno = req.body;
        nuevoAlumno.id = id;
        if(!nuevoAlumno.nombres){
            res.status(400).json({"message": "El nombre del alumno debe estar llenado"});
        }
        else if(!nuevoAlumno.apellidos){
            res.status(400).json({"message": "El apellido del alumno debe estar llenado"});
        }
        else if(!nuevoAlumno.matricula){
            res.status(400).json({"message": "La matrícula del alumno debe estar llenada"});
        }
        else if(!nuevoAlumno.promedio){
            res.status(400).json({"message": "El promedio del alumno debe estar llenado"});
        }
        else if(nuevoAlumno.promedio < 0){
            res.status(400).json({"message": "El promedio del alumno debe ser numérico"});
        }else{
            alumnos[index] = nuevoAlumno;
            res.status(200).json({"message": "Alumno actualizado satisfactoriamente con id "+id});
        }
    }else{
        res.status(404).json({
            'message': 'Alumno no encontrado'
        });
    }
});

app.delete('/alumnos/:id', (req, res) => {
    const id = req.params.id;
    const alumno = alumnos.find(alumno => alumno.id == id);
    if(alumno){
        alumnos = alumnos.map(alumno => alumno.id != id);
        res.status(200).json("Alumno con id "+id+" eliminado satisfactoriamente");
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
    if(!profesor.nombres){
        res.status(400).json({"message": "El nombre del profesor debe estar llenado"});
    }
    else if(!profesor.apellidos){
        res.status(400).json({"message": "El apellido del profesor debe estar llenado"});
    }
    else if(!profesor.numeroEmpleado){
        res.status(400).json({"message": "El numero de empleado del profesor debe estar llenada"});
    }
    else if(!profesor.horasClase){
        res.status(400).json({"message": "Las horas de clase del profesor debe estar llenados"});
    }
    else if(profesor.horasClase < 0){
        res.status(400).json({"message": "Las horas de clase del profesor deben ser numéricos"});
    }
    else{
        //profesor.id = profesores.pop().id + 1;
        profesores.push(profesor);
        res.status(201).json({"message": "Profesor creado satisfactoriamente con id "+profesor.id});
    }
});

app.get('/profesores/:id', (req, res) => {
    const id = req.params.id;
    const profesor = profesores.find(profesor => profesor.id == id);
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
    const profesor = profesores.find(profesor => profesor.id == id);
    const index = profesores.findIndex(profesor => profesor.id == id);
    if(profesor){
        const nuevoProfesor = req.body;
        nuevoProfesor.id = id;
        if(!nuevoProfesor.nombres){
            res.status(400).json({"message": "El nombre del profesor debe estar llenado"});
        }
        else if(!nuevoProfesor.apellidos){
            res.status(400).json({"message": "El apellido del profesor debe estar llenado"});
        }
        else if(!nuevoProfesor.numeroEmpleado){
            res.status(400).json({"message": "El numero de empleado del profesor debe estar llenada"});
        }
        else if(!nuevoProfesor.horasClase){
            res.status(400).json({"message": "Las horas de clase del profesor debe estar llenados"});
        }
        else if(nuevoProfesor.horasClase < 0){
            res.status(400).json({"message": "Las horas de clase del profesor deben ser numéricos"});
        }else{
            profesores[index] = nuevoProfesor;
            res.status(200).json({"message": "Profesor actualizado satisfactoriamente con id "+id});
        }
    }else{
        res.status(404).json({
            'message': 'Profesor no encontrado'
        });
    }
});

app.delete('/profesores/:id', (req, res) => {
    const id = req.params.id;
    const profesor = profesores.find(profesor => profesor.id == id);
    if(profesor){
        profesores = profesores.map(profesor => profesor.id != id);
        res.status(200).json("Profesor con id "+id+" eliminado satisfactoriamente");
    }else{
        res.status(404).json({
            'message': 'Alumno no encontrado'
        });
    }
});

app.listen(8080, () => console.log('Listening on port 8080'));
