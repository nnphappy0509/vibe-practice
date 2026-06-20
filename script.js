const quizData = [
    {
        question: "1897년, 고종이 자주독립 국가임을 알리기 위해 환구단에서 황제로 즉위하며 선포한 나라의 이름은?",
        options: ["조선", "대한민국", "대한제국", "고려"],
        correct: 2
    },
    {
        question: "1919년 3월 1일, 일제의 식민 통치에 항거하여 전국적으로 일어난 민족 해방 운동은?",
        options: ["갑신정변", "3·1 운동", "동학 농민 운동", "6·10 만세 운동"],
        correct: 1
    },
    {
        question: "1940년 대한민국 임시 정부가 충칭에서 창설한 정규 군대의 이름은?",
        options: ["조선의용대", "독립군", "대한독립군단", "한국광복군"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const quizEl = document.getElementById('quiz');
const scoreEl = document.getElementById('score');
const progressText = document.getElementById('progress-text');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultEl.classList.add('hidden');
    quizEl.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.innerText = currentQuiz.question;
    optionsEl.innerHTML = '';
    
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsEl.appendChild(button);
    });

    progressText.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;
}

function selectAnswer(selectedIndex, selectedButton) {
    const currentQuiz = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    // 버튼 클릭 비활성화
    buttons.forEach(btn => btn.style.pointerEvents = 'none');

    if (selectedIndex === currentQuiz.correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        // 정답 버튼도 초록색으로 표시
        buttons[currentQuiz.correct].classList.add('correct');
    }

    // 1.5초 후 다음 문제로 넘어감
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizEl.classList.add('hidden');
    resultEl.classList.remove('hidden');
    scoreEl.innerText = `${quizData.length}문제 중 ${score}문제를 맞혔습니다!`;
    progressText.innerText = "퀴즈 완료!";
}

// 퀴즈 시작
startQuiz();
