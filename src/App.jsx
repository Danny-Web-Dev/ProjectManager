import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSideBar from './components/ProjectsSideBar';
import SelectedProject from './components/SelectedProject';

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
	});

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

	const handleSelectedProject = (id) => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: id,
			};
		});
	};

	const handleDeleteProject = () => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),
			};
		});
	};

	const selectedProject = projectsState.projects.find((project) => {
		return project.id === projectsState.selectedProjectId;
	});

	let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;
	if (projectsState.selectedProjectId === null) {
		content = <NewProject onCancel={handleSelectedProject} onAdd={handleAddProject} />;
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleSelectedProject} />;
	}
	return (
		<>
			<main className='h-screen my-8 flex gap-8 '>
				<ProjectsSideBar onSelectProject={handleSelectedProject} onStartAddProject={handleSelectedProject} projects={projectsState.projects} />
				{content}
			</main>
		</>
	);
}

export default App;
