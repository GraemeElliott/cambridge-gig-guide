const gulp = require('gulp'),
      browserSync = require('browser-sync');



function watch() {
    browserSync.init(null, {
        proxy: "http://localhost:3000", // port of node server
    });
    gulp.watch(['./views/**/*.ejs','./partials/*.ejs', './assets/**/*.css']).on('change', browserSync.reload);
  };
  
  exports.watch = watch;