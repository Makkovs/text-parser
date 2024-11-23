import { Parser } from "./parser.js";

const parser = new Parser();
const analyzButton = document.querySelector(".analyz-button");
const input = document.querySelector(".textarea");
const fileInput = document.querySelector(".file-input");

const sentencesBody = document.querySelector(".sentences-body");
const wordsBody = document.querySelector(".words-body");
const symbolsBody = document.querySelector(".symbols-body");

function generateSentencesHTML (sentences = parser.sentences) {
  let sentencesHTML = `Sentences amount: ${sentences.length}`;
  for (let i = 0; i < sentences.length; i++) {
    sentencesHTML += `
      <div class="sentence">
        <p>${i + 1}. ${sentences[i].sentence}</p>
        <span class="sentence-info">words: ${sentences[i].wordAmount}, letters: ${sentences[i].letters}</span>
      </div>`
  }
  return sentencesHTML;
}

function generateWordsHTML (words = parser.words, wordsAmount = parser.getWordsAmount()) {
  let wordsHTML = `Words amount: ${wordsAmount} (unique words: ${words.length})`;
  for (let i = 0; i < words.length; i++) {
    wordsHTML += `
        <div class="word">
          <p>${i + 1}. ${words[i].word}</p>
          <span class="word-info">This word was used: ${words[i].uses} times</span>
        </div>
      `;
  }
  return wordsHTML;
}

function generateSymbolsHTML (symbols = parser.symbols, symbolsAmount = parser.getSymbolsAmount()) {
  symbols.find(symbol => symbol.symbol === " ").symbol = "space( )"
  let symbolsHTML = `Symbols amount: ${symbolsAmount} (unique symbols: ${symbols.length})`
  for (let i = 0; i < symbols.length; i++) {
    symbolsHTML += `
        <div class="symbol">
          <p>${i + 1}. ${symbols[i].symbol}</p>
          <span class="symbol-info">This symbol was used: ${symbols[i].uses} times</span>
        </div>
        `
  }
  return symbolsHTML;
}

function parseAndDisplay (text) {
  parser.parse(text);
  const sentencesHTML = generateSentencesHTML();
  const wordsHTML = generateWordsHTML();
  const symbolsHTML = generateSymbolsHTML();

  sentencesBody.innerHTML = sentencesHTML;
  wordsBody.innerHTML = wordsHTML;
  symbolsBody.innerHTML = symbolsHTML;
}

analyzButton.addEventListener("click", () => {
  let text;
  const textFile = fileInput.files[0];
  if (!textFile){
    text = input.value;
    parseAndDisplay(text);
  }else {
    const reader = new FileReader();
    reader.readAsText(textFile, "utf-8");
    reader.onload = () => {
      text = reader.result;
      parseAndDisplay(text);
    }
  }
});