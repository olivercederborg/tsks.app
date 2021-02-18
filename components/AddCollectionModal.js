import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
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
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	useToast,
	useRadioGroup,
	HStack
} from "@chakra-ui/react";

import ColorRadioButtons from "@/components/ColorRadioButtons";
import { createCollection } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import IconRadioButtons from "./IconRadioButtons";

const AddCollectionModal = ({ children }) => {
	const colorOptions = [
		"#FC76A1",
		"#DBBE56",
		"#E39264",
		"#D25A61",
		"#AE68E6",
		"#70C4BF",
		"#9E7F72"
	];

	const iconOptions = [
		MdLabel,
		IoSchool,
		GiPencilBrush,
		IoCodeSlash,
		FaLightbulb,
		HiLightningBolt,
		IoWallet,
		MdAssignment,
		IoBook,
		GiBroom,
		FaAppleAlt,
		IoFastFood,
		BiBuildingHouse,
		GiHouseKeys,
		GrPersonalComputer,
		FaHeadphonesAlt,
		MdPhoneIphone,
		FaCarAlt,
		FaShoppingCart,
		FaSuitcaseRolling
	];

	const initialRef = useRef(null);
	const colorPicker = useRef(null);
	const toast = useToast();
	const auth = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();
	const [collectionColor, setCollectionColor] = useState("#FC76A1");
	const [collectionIcon, setCollectionIcon] = useState("MdLabel");

	const { getRootProps, getRadioProps } = useRadioGroup(
		{
			name: "collection-color",
			defaultValue: "#FC76A1",
			onChange: setCollectionColor
		},
		{
			name: "collection-icon",
			defaultValue: "MdLabel",
			onChange: setCollectionIcon
		}
	);
	const colorGroup = getRootProps();
	const iconGroup = getRootProps();

	const onCreateCollection = ({ name }) => {
		const newCollection = {
			authorId: auth.user.uid,
			createdAt: new Date().toISOString(),
			name,
			collectionColor
		};

		const { id } = createCollection(newCollection);
		toast({
			title: "Success!",
			description: "We've added your collection.",
			status: "success",
			position: "top",
			duration: 3000,
			isClosable: true
		});
		mutate(
			["/api/todo-collections", auth.user.uid],
			async (data) => ({
				collections: [...data.collections, { id, ...newCollection }]
			}),
			false
		);
		onClose();
	};

	return (
		<>
			<button
				onClick={onOpen}
				className='default-focus hover:bg-hover-card rounded-2xl border-hover-card border-3 focus:outline-none flex flex-row items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-200 ease-in-out bg-transparent'
			>
				{children}
			</button>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onCreateCollection)}
					bgColor='#1D1D27'
					borderRadius='20px'
					color='white'
					pt='2'
				>
					<ModalHeader fontWeight='700'>Add Collection</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								ref={initialRef}
								placeholder='My Collection'
								border='3px solid'
								borderColor='#343343'
								py='5'
								px='4'
								borderRadius='12px'
								name='name'
								mb='6'
								_hover={{ borderColor: "#3D3C50" }}
								ref={register({ required: true })}
							/>
							<label>
								Color
								<div
									className='grid grid-cols-6 gap-2 mt-2'
									{...colorGroup}
								>
									{colorOptions.map((value) => {
										const radio = getRadioProps({ value });
										return (
											<ColorRadioButtons
												color={value}
												key={value}
												{...radio}
											>
												{value}
											</ColorRadioButtons>
										);
									})}
								</div>
							</label>
							<label
								htmlFor='colorPicker'
								className='flex flex-col mt-6'
							>
								Custom color
								<input
									ref={colorPicker}
									onChange={() =>
										setCollectionColor(colorPicker.current.value)
									}
									defaultValue='#FC76A1'
									type='color'
									id='colorPicker'
									name='colorPicker'
									className='w-16 h-12 p-0 mt-2 bg-transparent border-0 rounded-lg'
								/>
							</label>
							{/* <label className='flex flex-col mt-6'>
								Icon
								<div
									className='grid grid-cols-5 gap-2 mt-2'
									{...iconGroup}
								>
									{iconOptions.map((value) => {
										const radio = getRadioProps({ value });
										return (
											<IconRadioButtons
												icon={value}
												key={value}
												{...radio}
											>
												{value}
											</IconRadioButtons>
										);
									})}
								</div>
							</label> */}
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							type='submit'
							bgColor='#3D3C50'
							fontWeight='600'
							px='5'
							_hover={{
								bgColor: "#525166"
							}}
						>
							Create
						</Button>
						<Button
							onClick={onClose}
							ml={3}
							bgColor='transparent'
							fontWeight='600'
							px='5'
							_hover={{ bgColor: "#3D3C50" }}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddCollectionModal;
