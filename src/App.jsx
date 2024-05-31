import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSideBar from './components/ProjectsSideBar';

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
	});

	const handleStartAddProject = () => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: null,
			};
		});
	};

	const handleAddProject = (projectData) => {
		setProjectsState((prevState) => {
			const id = Object.keys(prevState.projects).length;
			const newProject = {
				...projectData,
				id: id,
			};
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject],
			};
		});
	};

	let content;
	if (projectsState.selectedProjectId === null) {
		content = <NewProject onAddProject={handleAddProject} />;
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}
	return (
		<>
			<main className='h-screen my-8 flex gap-8 '>
				<ProjectsSideBar onStartAddProject={handleStartAddProject} projects={projectsState.projects} />
				{content}
			</main>
		</>
	);
}

export default App;
