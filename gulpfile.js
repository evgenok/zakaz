const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const del = require('del');

function browsersync() {
   browserSync.init({
      server: {
         baseDir: 'app/'
      }
   });
}

function cleanDist() {
   return del('dist')
}

function images() {
   return src(['app/images/*/*',
      'app/images/*/*/*',
      'app/images/*/*/*/*',
      'app/images/*/*/*/*/*'
])
      .pipe(imagemin(
         [
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
               plugins: [
                  { removeViewBox: true },
                  { cleanupIDs: false }
               ]
            })
         ]
      ))
      .pipe(dest('dist/images'))
}

function scripts() {
   return src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      // 'node_modules/rateyo/src/jquery.rateyo.js',
      // 'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
      // 'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
      'app/js/main.js'
   ])
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(dest('app/js'))
      .pipe(browserSync.stream())
}

function styles() {
   return src('app/scss/*.scss')
      .pipe(scss({ outputStyle: 'compressed' }))
      .pipe(rename({
         suffix: '.min'
      }))
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 10 version'],
         grid: true
      }))
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}

function build() {
   return src([
      'app/css/style.min.css',
      'app/css/slick.css',
      'app/css/slick-theme.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/js/slick.js',
      'app/*.html',
      'app/*.php'
   ], { base: 'app' })
      .pipe(dest('dist'))
}

function watching() {
   watch(['app/scss/**/*.scss'], styles);
   watch(['app/js/main.js', '!app/js/main.min.js'], scripts);
   watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.rename = rename;
exports.cleanDist = cleanDist;



exports.build = series(cleanDist, images, build);
exports.default = parallel( styles, scripts, browsersync, watching);