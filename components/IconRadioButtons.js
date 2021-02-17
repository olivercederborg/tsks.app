import { useEffect, useState } from "react";
import { GiPencilBrush, GiBroom, GiHouseKeys } from "react-icons/gi";
import { HiLightningBolt } from "react-icons/hi";
import { MdAssignment, MdLabel, MdPhoneIphone } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { GrPersonalComputer } from "react-icons/gr";
import {
	IoSchool,
	IoCodeSlash,
	IoWallet,
	IoBook,
	IoFastFood
} from "react-icons/io5";
import {
	FaLightbulb,
	FaAppleAlt,
	FaHeadphonesAlt,
	FaCarAlt,
	FaShoppingCart,
	FaSuitcaseRolling
} from "react-icons/fa";

const { useRadio, Box, Icon } = require("@chakra-ui/react");

export default function IconRadioButtons(props) {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as='label' w='100%' h='100%'>
			<input className='default-focus' name='collection-icon' {...input} />
			<Box
				{...checkbox}
				w='100%'
				h='60px'
				cursor='pointer'
				borderWidth='2px'
				borderRadius='12px'
				borderColor='gray.400'
				display='flex'
				justifyContent='center'
				alignItems='center'
				transition='all 200ms ease-in-out'
				_checked={{
					borderColor: "#000000"
				}}
			>
				<Icon as={props.icon} className='text-4xl text-white' />
			</Box>
		</Box>
	);
}
