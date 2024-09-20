import { body } from './elements.js';
import displayScore from './quiz/displayScore.js';
import { quizInit } from "./quiz/init.js";
import { toggleModal } from './toggleModal.js';


const page = body.getAttribute('data-page')

switch (page) {
	case 'index':
		quizInit();
		break;
		
	case 'success':
		displayScore()

		// Щоб закрити модальне вікно
		document.querySelector('.modal-great .modal-footer a').onclick = () => toggleModal('.modal-great')
		break;
}