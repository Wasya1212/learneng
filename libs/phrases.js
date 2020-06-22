const Superagent = require('superagent');
const Cheerio = require('cheerio');

const findPhrases = async (words) => {
  return await Superagent.get(`https://context.reverso.net/translation/russian-english/${words.join('+')}`).set('user-agent', 'node.js');
}

const getPhrases = (phrasesPage) => {
  const $ = Cheerio.load(phrasesPage);

  let phrases = [];
  let processedPhrases = [];

  $('.example').find('.ltr > span').each((index, element) => {
    const phrase = $(element).text();

    if (phrase != '' && phrase != '/n') {
      phrases.push(phrase.toString());
    }
  });

  for (let i = 0; i < phrases.length - 1; i += 2) {
    processedPhrases.push({
      original: phrases[i],
      translate: phrases[i + 1]
    });
  }

  return processedPhrases;
}

const find = async (words, phrasesCount = 0) => {
  const phrasesPage = await findPhrases(Array.isArray(words) ? words : [words.toString()]);
  const phrasesList = getPhrases(phrasesPage.text.toString());

  return phrasesCount ? phrasesList.splice(0, phrasesCount) : phrasesList;
}

module.exports.findPhrases = findPhrases;
module.exports.getPhrases = getPhrases;
module.exports.find = find;
