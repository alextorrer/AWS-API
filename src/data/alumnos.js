const db = require('./db');

async function getAll(){
    const rows = await db.query(
        `SELECT id, nombres, apellidos, matricula, promedio FROM alumnos`
    );

    return rows;
}

async function save(alumno){
    const rows = await db.query(
        `INSERT INTO alumnos (nombres, apellidos, matricula, promedio) VALUES ('${alumno.nombres}', '${alumno.apellidos}', '${alumno.matricula}', '${alumno.promedio}')`
    );
    return rows;
}

async function get(id){
    const rows = await db.query(
        `SELECT id, nombres, apellidos, matricula, promedio FROM alumnos WHERE (id = ${id})`
    );
    return rows;
}

async function update(alumno){
    const rows = await db.query(
        `UPDATE alumnos SET nombres = '${alumno.nombres}', apellidos = '${alumno.apellidos}', matricula = '${alumno.matricula}', promedio = '${alumno.promedio}' WHERE (id = ${alumno.id})`
    );
    return rows;
}

async function remove(id){
    const rows = await db.query(
        `DELETE FROM alumnos WHERE (id = ${id})`
    );
    return rows;
}

module.exports = {
    getAll,
    save,
    get,
    update,
    remove
}