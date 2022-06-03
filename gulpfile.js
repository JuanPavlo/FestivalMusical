// Extraer la funcionalidad de gulp:
// importamos las funcionalidades de gulp 
// src sirve para extraer direcciones de archivos, dest sirve para almacenar algo en una carpeta destino
// parallel sirve para ejecutar 2 funciones al mismo tiempo
// wep sirve para aligerar imagenes y hacerlas menos pesadas


const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

function css(done){
    src("src/scss/**/*.scss")//Identificar el archivo SASS
        .pipe(plumber())
        .pipe(sass())//compilarlo
        .pipe(dest("build/css"));//almacenar
    done(); // es un callback que avisa a gulp cuando se llega al final de la funcion
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src("src/img/**/*.{jpg,png}")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"));
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{jpg,png}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"));
    done();
}

function dev(done){// dev de desarrollo
    watch("src/scss/**/*.scss", css);// se le pasa la funcion anterio y el archivo al que se le hacen los cambios
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
//exports.dev = dev;
exports.dev = parallel(imagenes, versionWebp, dev);
