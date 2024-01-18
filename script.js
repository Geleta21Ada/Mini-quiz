const question = [
    {
        question: "Mi a youtube-on legtöbbször dislike-olt játék trailer?",
        answers: [
            { text: "Cyberpunk 2077", correct: false},
            { text: "Battlefield 2042", correct: false},
            { text: "Grand Theft Auto 5", correct: false},
            { text: "Call of Duty: Infinite Warfare", correct: true},
        ]
    },
    {
        question: "Hogyan hívják az AC IV Black Flag főhősét?",
        answers: [
            { text: "Edward Kenway", correct: true},
            { text: "Ezio Auditore", correct: false},
            { text: "Connor Kenway", correct: false},
            { text: "Desmond Miles", correct: false},
        ]
    },
    {
        question: "Melyik játék nyerte 2015-ben az év játéka címet?",
        answers: [
            { text: "Fallout 4", correct: false},
            { text: "The Witcher 3: Wild Hunt", correct: true},
            { text: "Overwatch", correct: false},
            { text: "Dark Souls II", correct: false},
        ] 
    },
    {
        question: "Melyik játékban van ez a hang?",
        answers: [
            { text: "Minecraft", correct: false},
            { text: "Super Mario", correct: true},
            { text: "Crash Bandicoot", correct: false},
            { text: "Metal Gear Solid", correct: false},
        ],
        sound: "SuperMario.mp3"
    },
    {
        question: "Mi volt a Minecraft eredeti neve amikor még Notch fejlesztette?",
        answers: [
            { text: "Cave Game", correct: true},
            { text: "Let's Survive", correct: false},
            { text: "Blocks Game", correct: false},    
            { text: "The Land", correct: false},
        ] 
    },
    {
        question: "Ki a kitalálója a Steamnek?",
        answers: [
            { text: "Bill Gates", correct: false},
            { text: "Gabe Newell", correct: true},
            { text: "Steve Jobs", correct: false},
            { text: "Phil Spencer", correct: false},
        ] 
    },
    {
        question: "Melyik a világ legtöbbet eladott konzolja?",
        answers: [
            { text: "Xbox 360", correct: false},
            { text: "PlayStation 5", correct: false},
            { text: "Nintendo DS", correct: false},
            { text: "PlayStation 2", correct: true},
        ] 
    },
    {
        question: "Hogy hívják az a várost ahol a BioShock Infinite játszodik?",
        answers: [
            { text: "Tulum", correct: false},
            { text: "Sunken Land", correct: false},
            { text: "Columbia The flying City", correct: true},
            { text: "Limgrave", correct: false},
        ] 
    },
    {
        question: "Hány  darab FIFA játék létezik?",
        answers: [
            { text: "30", correct: true},
            { text: "33", correct: false},
            { text: "17", correct: false},
            { text: "27", correct: false},
        ] 
    },
    {
        question: "Melyik játéknak ez a logója?",
        answers: [
            { text: "Fable II", correct: false},
            { text: "The Elder Scrolls V: Skyrim", correct: true},
            { text: "Resident Evil 4", correct: false},
            { text: "Halo 3", correct: false},
        ],
        image: "https://www.pockettactics.com/wp-content/sites/pockettactics/2022/10/skyrim-logo.jpg" 
    },
    {
        question: "Mikor jelent meg az első játék?",
        answers: [
            { text: "1958", correct: true},
            { text: "1969", correct: false},
            { text: "1987", correct: false},
            { text: "1993", correct: false},
        ] 
    },
    {
        question: "Mi a legtöbszőr eladot játék?",
        answers: [
            { text: "Elden Ring", correct: false},
            { text: "GTA 5", correct: false},
            { text: "Minecraft", correct: true},
            { text: "The Last Of Us: Part II", correct: false},
        ] 
    },
    {
        question: "Hány block méretű egy chunk a Minecraftban?",
        answers: [
            { text: "64x64", correct: false},
            { text: "8x8", correct: false},
            { text: "32x32", correct: false},
            { text: "16x16", correct: true},
        ] 
    },
    {
        question: "Melyik volt az első battle royale típusú játék?",
        answers: [
            { text: "Playerunknown's Battleground", correct: false},
            { text: "H1Z1", correct: true},
            { text: "Call of Duty: Blackout", correct: false},
            { text: "Fortnite", correct: false},
        ] 
    },
    {
        question: "Melyik játékból van az alábbi kép?",
        answers: [
            { text: "Battlefield Bad Company", correct: false},
            { text: "Medal of Honor", correct: false},
            { text: "Battlefield 3", correct: true},
            { text: "Crysis 2", correct: false},
        ],
        image: "https://media.moddb.com/images/groups/1/13/12836/battlefield-4-gameplay-pics.jpg"
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Következő";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    if (currentQuestion.sound) {
        const audioElement = document.createElement("audio");
        audioElement.src = currentQuestion.sound;
        audioElement.controls = true;   
        questionElement.appendChild(audioElement);
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    if (currentQuestion.image) {
        const imageElement = document.createElement("img");
        imageElement.src = currentQuestion.image;
        imageElement.classList.add("question-image");
        questionElement.appendChild(imageElement);
    }
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score ++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Te ${score} pontot szereztél a ${question.length}-ből!`;
    nextButton.innerHTML = "Játsz újra";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();