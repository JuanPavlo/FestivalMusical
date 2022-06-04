// Extraer la funcionalidad de gulp:
// importamos las funcionalidades de gulp 
// src sirve para extraer direcciones de archivos, dest sirve para almacenar algo en una carpeta destino
// parallel sirve para ejecutar 2 funciones al mismo tiempo
// wep sirve para aligerar imagenes y hacerlas menos pesadas
// autoprefixer se asegura de que funcione en todos los navegadores
// cssnano comprime el codigo de css
// postcss hace trasnformaciones con los otros 2
// sourcemaps sirve para saber la direccion del archivo sas que modifica algo de la pagina web se puede ver desde el navegador

const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// JAVASCRIPT
const terser = require("gulp-terser-js");

function css(done){
    src("src/scss/**/*.scss")//Identificar el archivo SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())//compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
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

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{jpg,png}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"));
    done();
}

function javascript(done) {
    src("src/js/**/*js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/js"));
    done()
}

function dev(done){// dev de desarrollo
    watch("src/scss/**/*.scss", css);// se le pasa la funcion anterior y el archivo al que se le hacen los cambios
    watch("src/js/**/*.js", javascript);// se le pasa la funcion de javascript y el archivo al que se le hacen los cambios
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//exports.dev = dev;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
