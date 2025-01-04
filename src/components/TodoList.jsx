import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, startEditing, deleteTodo, completeTodo, showDetails }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>title</th>
					<th>status</th>
					<th>priority</th>
					<th>actions</th>
				</tr>
			</thead>
			<tbody>
				{todos.map((item) => (
					<TodoItem
						key={item.id}
						item={item}
						startEditing={startEditing}
						deleteTodo={deleteTodo}
						completeTodo={completeTodo}
						showDetails={showDetails}
					/>
				))}
			</tbody>
		</table>
	);
};

export default TodoList;
