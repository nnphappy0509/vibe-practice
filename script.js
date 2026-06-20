// 중3 역사(근현대사) 문제 데이터
const quizData = [
    {
        question: "1876년, 조선이 외국과 맺은 최초의 근대적 조약이자 불평등 조약은 무엇인가요?",
        options: ["을사늑약", "강화도 조약", "조미 수호 통상 조약", "제물포 조약"],
        correct: 1
    },
    {
        question: "1919년 3월 1일, 민족 대표 33인의 독립 선언서 낭독과 함께 시작된 전국적인 만세 운동은?",
        options: ["3·1 운동", "6·10 만세 운동", "광주 학생 항일 운동", "물산 장려 운동"],
        correct: 0
    },
    {
        question: "1945년 8월 15일, 우리 민족이 일제의 식민 통치에서 벗어나 국권을 되찾은 날을 기념하는 국경일은?",
        options: ["제헌절", "개천절", "삼일절", "광복절"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

// 웹페이지가 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {
    const questionEl = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const resultContent = document.getElementById("result-content");
    const quizContent = document.getElementById("quiz-content");
    const scoreDisplay = document.getElementById("score-display");
    const progressText = document.getElementById("progress-text");
    const retryBtn = document.getElementById("retry-btn");

    // 퀴즈 초기화 및 시작 함수
    function initQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContent.classList.add("hidden");
        quizContent.classList.remove("hidden");
        loadQuestion();
    }

    // 문제 불러오기 함수
    function loadQuestion() {
        optionsContainer.innerHTML = ""; // 이전 선택지 지우기
        const currentQuiz = quizData[currentQuestionIndex];
        
        questionEl.innerText = currentQuiz.question;
        progressText.innerText = `문제 ${currentQuestionIndex + 1} / ${quizData.length}`;

        currentQuiz.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.classList.add("option-btn");
            btn.addEventListener("click", () => handleAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    // 정답 확인 함수
    function handleAnswer(selectedIndex, selectedBtn) {
        const currentQuiz = quizData[currentQuestionIndex];
        const allBtns = document.querySelectorAll(".option-btn");

        // 한 번 클릭 후 다른 버튼 클릭 방지
        allBtns.forEach(btn => btn.style.pointerEvents = "none");

        if (selectedIndex === currentQuiz.correct) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("wrong");
            // 오답일 경우 정답 버튼도 초록색으로 표시
            allBtns[currentQuiz.correct].classList.add("correct");
        }

        // 1.5초(1500ms) 대기 후 다음 문제로 이동
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, 1500);
    }

    // 결과 화면 표시 함수
    function showResult() {
        quizContent.classList.add("hidden");
        resultContent.classList.remove("hidden");
        scoreDisplay.innerText = `총 ${quizData.length}문제 중 ${score}문제를 맞혔습니다!`;
        progressText.innerText = "퀴즈 완료 🎉";
    }

    // 다시 풀기 버튼 이벤트 연결
    retryBtn.addEventListener("click", initQuiz);

    // 첫 문제 시작
    initQuiz();
});
