const db = require('./db');

async function getAll(){
    const rows = await db.query(
        `SELECT id, numeroEmpleado, nombres, apellidos, horasClase FROM profesores`
    );

    return rows;
}

async function save(profesor){
    const rows = await db.query(
        `INSERT INTO profesores (nombres, apellidos, numeroEmpleado, horasClase) VALUES ('${profesor.nombres}', '${profesor.apellidos}', '${profesor.numeroEmpleado}', '${profesor.horasClase}')`
    );
    return rows;
}

async function get(id){
    const rows = await db.query(
        `SELECT id, nombres, apellidos, numeroEmpleado, horasClase FROM profesores WHERE (id = ${id})`
    );
    return rows;
}

async function update(profesor){
    const rows = await db.query(
        `UPDATE profesores SET nombres = '${profesor.nombres}', apellidos = '${profesor.apellidos}', numeroEmpleado = '${profesor.numeroEmpleado}', horasClase = '${profesor.horasClase}' WHERE (id = ${profesor.id})`
    );
    return rows;
}

async function remove(id){
    const rows = await db.query(
        `DELETE FROM profesores WHERE (id = ${id})`
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