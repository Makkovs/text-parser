import { Parser } from "./parser.js";

const parser = new Parser();
const analyzButton = document.querySelector(".analyz-button");
const input = document.querySelector(".textarea");

const sentencesBody = document.querySelector(".sentences-body");
const wordsBody = document.querySelector(".words-body");

analyzButton.addEventListener("click", () => {
    const text = input.value;

    parser.parse(text);
    const { sentences, words, symbols } = parser;
    const wordsAmount = parser.getWordsAmount();

    let sentencesText = "";
    for (let i = 0; i < sentences.length; i++){
      sentencesText += `
      <div class="sentence">
        <p>${i+1}. ${sentences[i].sentence}</p>
        <span class="sentence-info">words: ${sentences[i].wordAmount}, letters: ${sentences[i].letters}</span>
      </div>`
    }

    console.log(symbols)

    let wordsText = `Words amount ${wordsAmount} (unique words: ${words.length})`;
    for (let i = 0; i < words.length; i++){
      wordsText += `
        <div class="word">
          <p>${i+1}. ${words[i].word}</p>
          <span class="word-info">This word was used: ${words[i].uses} times</span>
        </div>
      `;
    }
    
    sentencesBody.innerHTML = sentencesText
    wordsBody.innerHTML = wordsText
})