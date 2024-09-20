import { toggleModal } from '../toggleModal.js';

// Функція для отримання результату з localStorage та виведення в блок
export default function displayScore() {
    const score = localStorage.getItem("score") || 0; // Отримуємо результат або 0 за замовчуванням

    // Оновлюємо текстове значення результату
    const graphNum = document.querySelector(".graph-num");
    const graphPercent = document.querySelector(".graph-percent");

    graphNum.textContent = score;
    graphPercent.textContent = "%";

    // Оновлюємо SVG прогрес
    const circularProgress = document.querySelector(".circular-progress");
    circularProgress.style.setProperty("--to", score);

	setTimeout(() => {
		toggleModal('.modal-great')
	}, 3000);
}