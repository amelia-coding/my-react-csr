const gulp = require('gulp');
// const babel = require('gulp-babel');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('tsconfig.json', { typescript: require('typescript') });

gulp.task('build:ts', () =>
  gulp
    .src('./src/**/*.ts')
    // .pipe(
    //   // 使用 .babelrc 配置
    //   babel(),
    // )
    .pipe(tsProject())
    .pipe(gulp.dest('./dist/')),
);

// 定义 default 任务
gulp.task('default', gulp.series('build:ts'));
