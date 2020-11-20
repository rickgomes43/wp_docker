
const gulp         = require('gulp');
const cssnano      = require('cssnano');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps   = require('gulp-sourcemaps')
const browserSync  = require('browser-sync').create();

// Copilando os arquivos Sass
gulp.task('style', function() {
    return gulp.src('./wp-content/themes/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./wp-content/themes/css'))
});

// Copilando os arquivos Sass para Painel de Controle Wordpress
gulp.task('style_admin', function() {
    return gulp.src('./wp-content/themes/sass/admin/all.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('admin.css'))
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./wp-content/themes/css'))
});

// Copilando os arquivos JavaScripts
gulp.task('scripts', function() {
    return gulp.src('./wp-content/themes/js/scripts/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./wp-content/themes/js'))
});

// Função para recarregar páginas no BrowserSync
gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

// Configurando e Montando Servidor BrowserSync
gulp.task('watch', function () {
    options = {};
    options.proxy = 'http://localhost'
    browserSync.init(options);

    gulp.watch('./wp-content/themes/sass/admin/**.scss', gulp.series('style_admin', 'reload'));
    gulp.watch('./wp-content/themes/sass/**/**.scss', gulp.series('style', 'reload'));
    gulp.watch('./wp-content/themes/js/scripts/**.js', gulp.series('scripts', 'reload'));
    gulp.watch('./wp-content/themes/*.php').on('change', browserSync.reload);
    gulp.watch('./wp-content/themes/**/*.php').on('change', browserSync.reload);
});


// PADRÃO
gulp.task('default', gulp.series('style', 'style_admin', 'scripts', 'watch'));

