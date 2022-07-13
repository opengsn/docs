const fs = require('fs')

function findFiles(folder, match = '[.]md') {

  if (!fs.existsSync(folder + '/')) {
    return []
  }
  return fs.readdirSync(folder)
    .flatMap(dir => {

      const file = folder + '/' + dir
      if (file.match(match)) {
        return [file]
      } else {
        return findFiles(file, match)
      }
    })
}

module.exports = { findFiles }
