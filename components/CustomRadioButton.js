import { useEffect, useState } from "react";

const { useRadio, Box } = require("@chakra-ui/react");

export default function RadioCard(props) {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();
	const [color, setColor] = useState("");
	const colorName =
		props.children.charAt(0).toUpperCase() + props.children.slice(1);

	useEffect(() => {
		if (props.color == "teal") {
			setColor("#4BAE96");
		} else if (props.color == "yellow") {
			setColor("#DDB058");
		} else if (props.color == "rose") {
			setColor("#D05673");
		} else {
			setColor("#7578D1");
		}
	}, [props.color]);

	return (
		<Box as='label'>
			<input name='collection-color' {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				borderWidth='3px'
				borderRadius='12px'
				borderColor={color}
				transition='all 200ms ease-in-out'
				mr='4'
				mt='2'
				w='50px'
				h='50px'
				_checked={{
					bg: color,
					color: "white",
					borderColor: color
				}}
				px={5}
				py={3}
			></Box>
		</Box>
	);
}
