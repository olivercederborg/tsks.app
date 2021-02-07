const Todo = ({ name }) => (
	<div className='py-2'>
		<div className='rounded-xl p-3 bg-gray-800'>
			<p className='font-semibold text-white'>{name}</p>
		</div>
	</div>
);

export default Todo;
