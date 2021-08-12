# gulp-simple2trad
gulp plugin translate simple to trad

## 安装

```js
npm install gulp-simple2trad -D
```

## 使用【gulpfile.js】

```js
const gulp = require('gulp')
const simple2trad = require('gulp-simple2trad')
const through = require('through2')

/**
 * 简体字翻译为繁体字
 */
const translate = () => {
  return gulp.src('../dist/lixin/**/*')
  .pipe(simple2trad({'餘額': '余額'}))
  .pipe(through.obj(function (chunk, enc, cb) {
    cb(null, chunk)
  }))
  .pipe(gulp.dest('../dist/test'))
}

exports.translate = translate
```

## 参数说明
> 由于部分简体中文直接翻译为繁体字往往存在特例问题，需要个性化处理某些词汇

```js
{
  '餘額': '余額'
}

// 将【餘額】 替换为 【余額】
```
