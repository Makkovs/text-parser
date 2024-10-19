import { Parser } from "./parser.js";

const parser = new Parser();
const analyzButton = document.querySelector(".analyz-button");
const input = document.querySelector(".textarea");

const sentencesBody = document.querySelector(".sentences-body");
const wordsBody = document.querySelector(".words-body");
const symbolsBody = document.querySelector(".symbols-body");

function generateSentencesHTML (sentences) {
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

function generateWordsHTML (words, wordsAmount) {
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

function generateSymbolsHTML (symbols, symbolsAmount) {
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

analyzButton.addEventListener("click", () => {
  const text = input.value;

  parser.parse(text);
  const { sentences, words, symbols } = parser;
  const wordsAmount = parser.getWordsAmount();
  const symbolsAmount = parser.getSymbolsAmount();

  const sentencesHTML = generateSentencesHTML(sentences);
  const wordsHTML = generateWordsHTML(words, wordsAmount);
  const symbolsHTML = generateSymbolsHTML(symbols, symbolsAmount);

  sentencesBody.innerHTML = sentencesHTML;
  wordsBody.innerHTML = wordsHTML;
  symbolsBody.innerHTML = symbolsHTML;
})