const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

//! Función para compilar Sass a CSS y generar app.css
function css( done ){
    return src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(dest('build/css')) // Guarda el archivo compilado en build/css
        .on('end', done);
}

//! Función para observar cambios en los archivos Sass
function dev(){
    watch('src/scss/**/*.scss', css);
}

//! Exportación de las tareas
exports.css = css;
exports.dev = dev;
