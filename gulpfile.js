// Extraer la funcionalidad de gulp:
// importamos las funcionalidades de gulp 
const {src, dest} = require("gulp");
//src sirve para extraer direcciones de archivos, dest sirve para almacenar algo en una carpeta destino
const sass = require("gulp-sass")(require("sass"));

function css(done){
    src("src/scss/app.scss")//Identificar el archivo SASS
        .pipe(sass())//compilarlo
        .pipe(dest("build/css"));//almacenar
    done(); // es un callback que avisa a gulp cuando se llega al final de la funcion
}

exports.css = css;