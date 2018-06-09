const toLower = s => s.toLowerCase()
const toUpper = s => s.charAt(0).toUpperCase() + s.substr(1)

const getBareFileFrom = fileName => {
  return fileName.slice(0, -3)
}

const camelize = (text, separator = '-') => {
  let actualSep = text.includes('_') ? '_' : separator
  const words = text.split(actualSep)
  return [
    words[0],
    words
      .slice(1)
      .map(toUpper)
      .join(''),
  ].join('')
}

const toWords = (text, separator = '-') => {
  let actualSep = text.includes('_') ? '_' : separator
  const words = text.split(actualSep)
  return words.join(' ')
}

module.exports = {
  toWords,
  camelize,
  getBareFileFrom,
  toLower,
  toUpper,
}
