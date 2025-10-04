// Simple Quiz Data 

const { use } = require("react");

const quizData = [
    {
        question: "Which language is primarily used to style web pages?",
        options: ['HTML', 'JavaScript', 'CSS', 'Python'],
        answer: 2
    },

    {
question: 'What does DOM stand for?',
options: ['Document Object Model', 'Data Object Model', 'Digital Object Map', 'Document Option Model'],
answer: 0
},
{
question: 'Which HTML tag is used for an ordered list?',
options: ['<ul>', '<li>', '<ol>', '<list>'],
answer: 2
},
{
question: 'Which method is used to add an event listener in JavaScript?',
options: ['attachEvent', 'addEventListener', 'onEvent', 'listenEvent'],
answer: 1
},
{
question: 'Which of these is NOT a JavaScript data type?',
options: ['Undefined', 'Boolean', 'Float', 'Object'],
answer: 2
}
]

// States 

let currentIndex = 0;
let score = 0;
const userAnswers = Array(quizData.length).fill(null);

// Elements 
const qNumber = document.getElementById("qNumber");
const qText = document.getElementById("qText");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const liveScore = document.getElementById("liveScore");
const resultBox = document.getElementById("result");
const finalScore = document.getElementById("finalScore");
const totalQSpan = document.getElementById("totalQ");
const retryBtn = document.getElementById("retryBtn");
const reviewBtn = document.getElementById("reviewBtn");
const reviewDiv = document.getElementById("review");
const reviewList = document.getElementById("reviewList");


// Functions 

function renderQuestion(){
    const q = quizData[currentIndex];

    qNumber.textContent = q.question

    optionsDiv.innerHTML = '';

    q.options.forEach((opt, idx) =>{
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `option-btn w-full text-left px-4 py-3 rounded-lg border hover:bg-slate-100`;
        btn.innerHTML = `<span class ="inline-block mr-3 font-medium"> ${String.fromCharCode(65 + idx)}.</span> ${opt}`
        btn.dataset.index = idx;

        // Show Selection if user already answered 

        if(userAnswers[currentIndex] === idx){
            btn.classList.add('bg-indigo-50', 'border-indigo-300');
        }

        btn.addEventListener('click', () => selectOption(idx));
        optionsDiv.appendChild(btn)
    });

    // Update Controlls 

    prevBtn.disabled = currentIndex === 0;
    liveScore.textContent = score;
}


function selectOption(idx){

    // Record the Answers 

    const prev = userAnswers[currentIndex];
    if(prev !== null){
        // if changing an already-correct answer we may need to update score
        if(prev === quizData[currentIndex].answer) score--;

        }

        userAnswers[currentIndex] = idx;

        // if newly corrected 
        if(idx === quizData[currentIndex].answer) score++;

        // visvually mark selected option

        Array.from(optionsDiv.children).forEach(btn =>{
            btn.classList.remove('bg-indigo-50', 'border-indigo-300');
        });

        const  selectedBtn = Array.from(optionsDiv.children).find(b => Number(b.dataset.index) === idx);
        if(selectedBtn) selectedBtn.classList.add('bg-indigo-50', 'border-indigo-300');

        liveScore.textContent = score;
    
}

function clearAnswer(){
    const prev = userAnswers[clearAnswer];
    if(prev !== null){
    if(prev === quizData[currentIndex].answer)score--;
    userAnswers[currentIndex] = null;
    Array.from(optionsDiv.children).forEach(btn => btn.classList.remove('bt-indigo-50', 'border-indigo-300'));
    liveScore.textContent = score;
    }
}

function goNext(){
    if(currentIndex < quizData.length -1){
        currentIndex ++;
        renderQuestion();
    }else{
        showResult()
    }
}

function goPrev(){
    if(currentIndex > 0){
        currentIndex --;
        renderQuestion();
    }
}

function showResult(){

    // Hide Quiz Aread and Show Result
}