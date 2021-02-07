const Todo = ({ name, todoKey }) => {
	return (
		<div className='py-2' key={todoKey}>
			<div className='rounded-xl bg-primary-card p-3'>
				<p className='font-semibold text-white'>{name}</p>
			</div>
		</div>
	);
};

export default Todo;
