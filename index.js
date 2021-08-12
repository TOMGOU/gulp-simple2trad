const through = require('through2')
const PluginError = require('plugin-error')
const cnchar = require('cnchar')
const trad = require('cnchar-trad')
cnchar.use(trad)

module.exports = function(opt) {
  let options = opt || {}

  options.output = options.output || {}

  function simple2trad(file, encoding, callback) {
    if (file.isNull()) {
      this.push(file)
      return callback()
    }

    if (file.isStream()) {
      this.emit('end')
      return new callback(PluginError('gulp-simple2trad', 'Streaming not supported:' + file.path))
    }

    let newSource = ''
    newSource = cnchar.convert.simpleToTrad(file.contents.toString())
    const optionKeys = Object.keys(options)
    optionKeys.length && optionKeys.forEach(key => {
      newSource = newSource.replace(new RegExp(key, 'g'), options[key])
    })
    file.contents = Buffer.from(newSource)
    this.push(file)

    callback()
  }

  return through.obj(simple2trad)
}
