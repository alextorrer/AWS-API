function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
}

function isFloat(value){
    return !isNaN(value) && 
           parseFloat(Number(value)) == value && 
           !isNaN(parseFloat(value, 10));
}

module.exports = {
    isInt,
    isFloat
}
