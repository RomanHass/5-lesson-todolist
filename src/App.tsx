import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

function App() {

	const todolistID1 = v1();
	const todolistID2 = v1();

	const [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const removeTask = (todolistId: string, taskId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
		}
		setTasks(newTodolistTasks);
	}

	const addTask = (todolistId :string, title: string)=> {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks({[todolistId]: [newTask, ...tasks[todolistId]] , ...tasks})

	}

	const changeFilter = (todolistId:string, newFilterValue: FilterValuesType) => {
		const newTodolist = todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue}: tl)
		setTodolists(newTodolist)
	}

	const changeTaskStatus = (todolistId: string, taskId: string, newStatusValue: boolean) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatusValue} : t)
		}
		setTasks(newTodolistTasks);
	}

	const removeTodolist = (todolistId: string) => {
		const newTodolists = todolists.filter(tl => tl.id !== todolistId);
		setTodolists(newTodolists);
		delete tasks[todolistId]
		setTasks({...tasks})
	}


	return (
		<div className="App">
			{todolists.map(tl => {
				const allTodolistTasks = tasks[tl.id]
				let tasksForTodolist = allTodolistTasks
				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				}

				return (
					<Todolist
						todolistId={tl.id}
						key={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
					/>
				);
			})}
		</div>
	);
}

export default App;
