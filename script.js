const startBtn = document.querySelector('.Start-button');
const quizInfo = document.querySelector('.quiz-info');
const exitBtn = document.querySelector('.exit-button');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-button');
const quizPortion = document.querySelector('.quiz-portion');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-button');
const goHomeBtn = document.querySelector('.goHome-button');

startBtn.onclick = () => {
    quizInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () => {
    quizInfo.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick = () => {
    quizPortion.classList.add('active');
    quizInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
goHomeBtn.onclick = () => {
    quizPortion.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    
}
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-button');


nextBtn.onclick = () => {
    if (questionCount < questions.length - 1){
        
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
   
}

const optionsList = document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.questions');
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionsList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i< option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionsList.children.length;

    if (userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');
        for(let i = 0; i < allOptions; i++){
            if(optionsList.children[i].textContent == correctAnswer)
            {
                optionsList.children[i].setAttribute('class', 'option correct');
            }
        }
    }
    
    for(let i = 0; i < allOptions; i++){
        optionsList.children[i].classList.add('disabled');
    }
    
    nextBtn.classList.add('active');

}

function questionCounter(index){

    const totalQuestion = document.querySelector('.total-questions');
    totalQuestion.textContent = `${index} of ${questions.length} Questions`;
}
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;

}
function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Score: ${userScore} out of ${questions.length}`;
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(rgb(154, 205, 50) ${progressStartValue * 3.6}deg , rgb(8, 8, 59) 0deg)`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}