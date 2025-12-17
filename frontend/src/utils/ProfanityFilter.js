import filter from 'leo-profanity'

const english = filter.list()

filter.loadDictionary('ru')
filter.add(english)

export const filterProfanity = (text) => {
  return filter.clean(text ?? '', '*')
}

export default filterProfanity
