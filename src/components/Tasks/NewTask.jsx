import { useState } from 'react';

const NewTask = ({ onAdd }) => {
	const [enteredTask, setEnteredTask] = useState('');
	const [showError, setShowError] = useState(false);

	const handleChange = (e) => {
		setShowError(false);
		setEnteredTask(e.target.value);
	};

	const handleClick = () => {
		if (!isTaskValid()) {
			setShowError(true);
			return;
		}
		onAdd(enteredTask);
		setEnteredTask('');
	};

	const isTaskValid = () => {
		return enteredTask.trim() === '';
	};

	let inputClasses = 'w-64 px-2 py-1 rounded-sm bg-stone-200';

	if (showError) {
		inputClasses += ' border border-red-500';
	}

	return (
		<div className='flex items-center gap-4'>
			<input className={inputClasses} type='text' onChange={handleChange} value={enteredTask} />
			<button className='text-stone-700 hover:text-stone-950' onClick={handleClick}>
				Add Task
			</button>
		</div>
	);
};

export default NewTask;
