import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = forwardRef(({ children, buttonCaption }, ref) => {
	const dialogRef = useRef();

	useImperativeHandle(ref, () => {
		return {
			open() {
				dialogRef.current.showModal();
			},
		};
	});

	const dialog = (
		<dialog ref={dialogRef} className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'>
			{children}
			<form method='dialog' className='mt-4 text-right'>
				<Button>{buttonCaption}</Button>
			</form>
		</dialog>
	);

	return createPortal(dialog, document.getElementById('modal-root'));
});

export default Modal;
