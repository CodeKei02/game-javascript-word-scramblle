let wordList = document.querySelector('.word__list');
let wordText = document.querySelector('#word');
let tries = document.querySelector('#tries');
triesCircle = document.querySelectorAll('.tries__circles');
let mistakes = document.querySelector('#mistakes');
let randomButton = document.querySelector('#random');
let resetButton = document.querySelector('#reset');
let words = ["believe", "faith", "never", "flower", "web"];
let correctWord;
let messyWord;
let attempts = 0;
let wordInput;
const maxAttempts = 5;

function initializeGame() {
    correctWord = words[Math.floor(Math.random() * words.length)];
    messyWord = correctWord.split('').sort(() => Math.random() - 0.5).join('');
    wordText.innerHTML = messyWord;
    createInputs();
}

function createInputs() {
    wordList.innerHTML = "";
    for (let i = 0; i < correctWord.length; i++) {
        wordInput = document.createElement('input');
        wordInput.type = "text";
        wordInput.maxLength = 1;
        wordInput.dataset.index = i;
        wordInput.classList.add('word__input');
        wordInput.addEventListener('input', handleInput);
        wordList.appendChild(wordInput);
    }
}

function handleInput(e) {
    const currentInput = e.target;
    const currentIndex = parseInt(currentInput.dataset.index);

    if (currentInput.value.match(/^[a-zA-Z]$/)) {
        let input = wordList.querySelector(`input[data-index="${currentIndex}"]`);
        
        input.addEventListener('keydown', function(event){
            if(input.value !== ""){
                input = wordList.querySelector(`input[data-index="${currentIndex + 1}"]`);
                if(input) input.focus();
            }

            //Error, no enfoca el input anterior cuando presiono la tecla Backspace
            if(event.key === "Backspace"){
                const previousInput = wordList.querySelector(`input[data-index="${currentIndex}"]`);
                if(previousInput) previousInput.focus();
            }
        });
        if (currentIndex === correctWord.length - 1) {
            checkWord();
        }
    } else {
        currentInput.value = '';
    }
}

function checkWord() {
    const inputs = document.querySelectorAll('.word__list input');
    let formedWord = "";

    inputs.forEach(input => {
        formedWord += input.value;
    });

    if (formedWord.toLowerCase() === correctWord) {
        alert('Success✅');
    } else {
        attempts++;
        alert('Failed❎');
        mistakesLetter(formedWord);
        violetCircles(triesCircle);
        tries.textContent = `Tries (${attempts}/${maxAttempts}):`;

        if (attempts >= maxAttempts) {
            loseGame(inputs);
        }
    }
}

function violetCircles(selector){   
    selector.forEach((circle, index) => {
        if(index + 1 === attempts){
            circle.style.backgroundColor = "#7429C6";
        }
    });
}

function grayCircles(selector){
    selector.forEach((circle) =>{
        if(attempts === 0){
            circle.style.backgroundColor = "#4A5567";
        }
    });
}

function mistakesLetter(formedWord) {
    let character = formedWord.split("");
    let correctLetter = correctWord.split("");
    let wrongLetter = [];

    for (let char of character) {
        if (!character.includes(correctLetter)) {
            wrongLetter.push(char); //Error: Se agrega toda la palabra en vez de las letras que no deberia estar en la palabra
        } else {
            wrongLetter = [];
        }
    }

    mistakes.textContent = `${wrongLetter.join(",")}`;
}

function loseGame(inputs) {
    alert('Finished attempts. You lose😭😭');
    tries.style.color = 'red';
    randomButton.style.display = 'none';
    wordText.textContent = "GAME OVER";
    wordText.style.color = "red";
    

    inputs.forEach((input) => {
        input.style.display = 'none';
    });
}

function resetGame() {
    let inputs = document.querySelectorAll('.word__list input');
    attempts = 0;
    tries.textContent = `Tries (${attempts}/${maxAttempts}):`;
    tries.style.color = "#4A5567";
    wordText.style.color = "#97A3B6";
    wordText.textContent = messyWord;
    grayCircles(triesCircle)


    mistakes.textContent = "";
    randomButton.style.display = "block";

    inputs.forEach((input) => {
        input.style.display = 'block';
        input.value = "";
    })
}

initializeGame();

randomButton.addEventListener('click', function () {
    initializeGame();
    mistakes.textContent = "";
});

resetButton.addEventListener('click', resetGame);
