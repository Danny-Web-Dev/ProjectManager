import React from 'react';
import noProjectImage from '../assets/no-projects.png';
import Button from './Button.jsx';
import MessageBlock from './MessageBlock.jsx';

const NoProjectSelected = ({ onStartAddProject }) => {
	return (
		<div className='mt-24 text-center w-2/3'>
			<img className='w-16 h-16 object-contain mx-auto' src={noProjectImage} alt='An empty task list' />
			<MessageBlock title='No Project Selected'>
				<p id='noProjectInstructions'>Select a project or get started with a new one</p>
			</MessageBlock>
			<p className='mt-8'>
				<Button
					onClick={() => {
						onStartAddProject(null);
					}}>
					Create new project
				</Button>
			</p>
		</div>
	);
};

export default NoProjectSelected;
