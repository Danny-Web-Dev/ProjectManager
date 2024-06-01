import { useState } from 'react';
import NewProject from './components/Project/NewProject';
import NoProjectSelected from './components/Project/NoProjectSelected';
import SideBar from './components/SideBar';
import SelectedProject from './components/Project/SelectedProject';

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
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

	const handleAddTask = (text) => {
		setProjectsState((prevState) => {
			const id = Object.keys(prevState.tasks).length;
			const newTask = {
				text: text,
				id: id,
				projectId: prevState.selectedProjectId,
			};
			return {
				...prevState,
				tasks: [...prevState.tasks, newTask],
			};
		});
	};
	const handleDeleteTask = (id) => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				tasks: prevState.tasks.filter((task) => task.id !== id),
			};
		});
	};

	const selectedProject = projectsState.projects.find((project) => {
		return project.id === projectsState.selectedProjectId;
	});

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	);
	if (projectsState.selectedProjectId === null) {
		content = <NewProject onCancel={handleSelectedProject} onAdd={handleAddProject} />;
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleSelectedProject} />;
	}
	return (
		<>
			<main className='h-screen my-8 flex gap-8 '>
				<SideBar
					onSelectProject={handleSelectedProject}
					onStartAddProject={handleSelectedProject}
					projects={projectsState.projects}
					selectedProjectId={projectsState.selectedProjectId}
				/>
				{content}
			</main>
		</>
	);
}

export default App;
