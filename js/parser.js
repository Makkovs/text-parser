export class Parser {
  
  constructor () {
    this.sentences = [];
    this.words = [];
    this.symbols = [];
  }

  parse (text) {
    if (!text){
      return
    }
    this.sentences = [];
    this.words = [];
    this.symbols = [];
    
    let sentence = "";
    let sentenceWordAmount = 0;
    let word = "";

    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const lowerLetter = letter.toLowerCase();
      const isLastLetter = (i + 1) >= text.length;

      const findedSymbol = this.symbols.find(symbol => symbol.symbol === lowerLetter);
      if (findedSymbol){
        findedSymbol.uses += 1;
      } else {
        const symbolObj = {
          symbol: lowerLetter,
          uses: 1
        }
        this.symbols.push(symbolObj);
      }

      if ((/[:;.?!, ]/.test(lowerLetter) || isLastLetter) && word.length > 0){
        sentenceWordAmount++;
        word = word.trim()
        const findedWord = this.words.find(wordf => wordf.word === word);;
        if (findedWord){
          findedWord.uses += 1;
        }else {
          const wordObj = {
            word: word,
            uses: 1
          }
          this.words.push(wordObj);
        }

        word = "";
      } else {
        word += lowerLetter
      }
      
      sentence += letter;

      if (/[.?!]/.test(letter) || isLastLetter){
        const sentenceLetters = sentence.replace(/[^\p{L}]/gu, '').length;
        const sentenceObj = {
          sentence: sentence.trim(),
          wordAmount: sentenceWordAmount,
          letters: sentenceLetters
        }
        this.sentences.push(sentenceObj);
        sentence = "";
        sentenceWordAmount = 0;
      }
    }
    this.words.sort((a, b) => b.uses - a.uses);
    this.symbols.sort((a, b) => b.uses - a.uses);
  }

  getWordsAmount () {
    return this.words.reduce((acc, word) => acc + word.uses, 0);
  }

  getSymbolsAmount () {
    return this.symbols.reduce((acc, symbol) => acc + symbol.uses, 0);
  }
}