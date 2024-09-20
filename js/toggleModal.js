import { body } from './elements.js';

export function toggleModal(modalSelector) {
	
	const elModal = document.querySelector(modalSelector)

	if (elModal.classList.contains('show')) {
		
		body.classList.remove('modal-show');
		elModal.classList.remove('show');

	} else {
	
		body.classList.add('modal-show');
		elModal.classList.add('show');

	}
}