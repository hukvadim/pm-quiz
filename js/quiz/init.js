import { toggleModal } from '../toggleModal.js';
import { quizData } from './quizData.js';

export const elQuizzInitBtns = document.querySelectorAll(".js-quizz-init");
export const elTotalPages = document.getElementById("total-pages");
export const elQuizzContainer = document.getElementById("quizz-container");
export const elQuizzBtnNext = document.getElementById("next-btn");
export const elQuizzBtnPrev = document.getElementById("prev-btn");
export let currentQuestionIndex = 0;
export let currentSex = 0;
export const userAnswers = [];


export function quizInit() {

    function renderQuiz(event) {
        const totalPages = quizData.length;
        elTotalPages.textContent = totalPages;
        currentSex = event.target.value;

        toggleModal('.modal-quiz');
        renderQuestion();
        updateProgressBar();
    }

    function renderQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        const questionHTML = `
	  <h3 class="quizz__title">${currentQuestion.question}</h3>
	  <ul class="quizz__ul">
		${currentQuestion.options
            .map(
                (option, index) => `
		  <li class="quizz__li">
			<label class="checked-box checked-box-quizz">
			  <input type="radio" name="quizz" value="${index}" ${userAnswers[currentQuestionIndex] === index ? "checked" : ""}>
			  <span class="checked-box__hold checked-box-wrap">
				<span class="checked-box__text">${option}</span>
			  </span>
			</label>
		  </li>
		`
            )
            .join("")}
	  </ul>
	`;

    elQuizzContainer.innerHTML = questionHTML;

        // Додаємо слухач на вибір відповіді
        document.querySelectorAll('input[name="quizz"]').forEach((input) => {
            input.addEventListener("change", () => {
                saveAnswer();
                if (currentQuestionIndex < quizData.length - 1) {
                    nextQuestion();
                } else {
                    showResults();
                }
            });
        });
    }

    function nextQuestion() {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
            updateProgressBar();
            updateCurrentPage();
        }
    }

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
            updateProgressBar();
            updateCurrentPage();
        }
    }

    function saveAnswer() {
        const selectedAnswer = document.querySelector('input[name="quizz"]:checked');
        if (selectedAnswer) {
            userAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);
        }
    }

    function updateProgressBar() {
        const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
        document.getElementById("progress-bar").style.width = progressPercent + "%";
    }

    function updateCurrentPage() {
        document.getElementById("current-page").textContent = currentQuestionIndex + 1;
    }
	
	function calculateScore() {
		let correctAnswersCount = 0;
		quizData.forEach((question, index) => {
		  if (userAnswers[index] === question.correctAnswer) {
			correctAnswersCount++;
		  }
		});
		
		return Math.round((correctAnswersCount / quizData.length) * 100);
	}

    function showResults() {
		console.log("quizData: ", quizData);

		// Вивести процент правильних відповідей
		const scorePercentage = calculateScore();
		console.log(`Your score: ${scorePercentage}% correct answers.`);
		localStorage.setItem('quizData', JSON.stringify(quizData))
		localStorage.setItem('score', scorePercentage)
		
		setTimeout(() => {
			window.location.href = 'success.html'; // Вкажіть URL потрібної сторінки
		}, 500);
    }


    elQuizzInitBtns.forEach(element => {
        element.addEventListener("change", renderQuiz);
    });

    elQuizzBtnNext.addEventListener("click", nextQuestion);
    elQuizzBtnPrev.addEventListener("click", prevQuestion);
}
