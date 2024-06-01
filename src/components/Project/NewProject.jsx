import { useRef } from 'react';
import Input from '../Utils/Input.jsx';
import Modal from '../Utils/Modal.jsx';
import MessageBlock from '../Utils/MessageBlock.jsx';

const NewProject = ({ onAdd, onCancel }) => {
	const modal = useRef();
	const title = useRef();
	const description = useRef();
	const dueDate = useRef();

	const handleSave = () => {
		const enteredTitle = title.current.value;
		const enteredDescription = description.current.value;
		const enteredDueDate = dueDate.current.value;

		if (!validateNewProject({ enteredTitle, enteredDescription, enteredDueDate })) {
			return;
		}

		onAdd({
			title: enteredTitle,
			description: enteredDescription,
			dueDate: enteredDueDate,
		});
	};

	const validateNewProject = (projectData) => {
		if (projectData.enteredTitle.trim() === '' || projectData.enteredDescription.trim() === '' || projectData.enteredDueDate.trim() === '') {
			modal.current.open();
			return false;
		}

		return true;
	};

	return (
		<>
			<Modal ref={modal} buttonCaption='Close'>
				<MessageBlock title='Invalid Input'>
					<p id='modalDesc'>Oops... Looks like you forgot to enter a value.</p>
					<p id='modalDescTwo'>Please make sure you provide a valid value for every input field.</p>
				</MessageBlock>
			</Modal>
			<div className='w-[35rem] mt-16'>
				<div>
					<Input type='text' ref={title} labelContent='Title' />
					<Input ref={description} textarea labelContent='Description' />
					<Input type='date' ref={dueDate} labelContent='Due Date' />
				</div>
				<menu className='flex items-center justify-end gap-4 my-4'>
					<li>
						<button
							className='text-stone-800 hover:text-stone-950'
							onClick={() => {
								onCancel(undefined);
							}}>
							Cancel
						</button>
					</li>
					<li>
						<button className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950' onClick={handleSave}>
							Save
						</button>
					</li>
				</menu>
			</div>
		</>
	);
};

export default NewProject;
