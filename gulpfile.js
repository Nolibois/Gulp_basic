let gulp = require("gulp");
let sass = require("gulp-sass");
sass.compiler = require("node-sass");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let cssnano = require("cssnano");
let imagemin = require("gulp-imagemin");
let copy = require("gulp-copy");

gulp.task("sass", () => {
  return gulp
    .src("./src/assets/sass/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("watch", () => {
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series("sass"));
});

/* gulp.task("postcss:prefix", function () {
  return gulp
    .src("./src/assets/css/*.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("postcss:min", function () {
  return gulp
    .src("./src/assets/css/*.css")
    .pipe(postcss([cssnano]))
    .pipe(gulp.dest("./dist/assets/css"));
}); */

// Autoprefix, cssnano
gulp.task("postNanoPrefix", () => {
  return gulp
    .src("src/assets/css/*.css")
    .pipe(postcss([autoprefixer(), cssnano]))
    .pipe(gulp.dest("dist/assets/css"));
});

// Minifie les images
exports.default = () =>
  gulp
    .src("src/assets/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/images"));

// Place l'index.html dans "dist"
gulp.task("distHtml", () => {
  return gulp.src("src/index.html").pipe(gulp.dest("dist/"));
});
