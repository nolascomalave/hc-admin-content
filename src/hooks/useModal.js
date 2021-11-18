import { useState } from 'react';

export const useModal=(initialModal)=>{
	const [isOpen, SetIsOpen]=useState(initialModal);

	const closeModal=()=>SetIsOpen(false);
	const openModal=()=>SetIsOpen(true);

	return [ isOpen, openModal, closeModal ];
}