const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

//! Función para compilar Sass a CSS y generar app.css
function css( done ){
    return src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(dest('build/css')) // Guarda el archivo compilado en build/css
        .on('end', done);
}

//! Función para observar cambios en los archivos Sass y ejecutar la tarea css
function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/javascript/**/*.js', javascript);
}


function javascript() {
    return src('src/javascript/**/*.js')
        .pipe(dest('build/js'));
}

//! Exportación de las tareas
exports.css = css;
exports.dev = dev;
exports.default = parallel(css, javascript);
