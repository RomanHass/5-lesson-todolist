type ButtonPropsType = {
	title: string
	onClick?:()=> void
	className?: string
}

export const Button = ({title, onClick, className}: ButtonPropsType) => {
	return (
		<button 
			onClick={onClick}
			className={className}
			>{title}</button>
	)
}
