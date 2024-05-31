const MessageBlock = ({ title, children }) => {
	return (
		<>
			<h2 className='text-xl font-bold text-stone-500 my-4'>{title}</h2>
			{Array.isArray(children) ? (
				children.map((child) => {
					return (
						<p key={child.props.id} className='text-stone-400 mb-4'>
							{child.props.children}
						</p>
					);
				})
			) : (
				<p className='text-stone-400 mb-4'>{children.props.children}</p>
			)}
		</>
	);
};

export default MessageBlock;
