import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
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
	useRadioGroup
} from "@chakra-ui/react";

import RadioCard from "@/components/CustomRadioButton";
import { editCollection } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { getUserCollections } from "@/lib/db-admin";
import { useRouter } from "next/router";

const EditCollectionModal = ({ children, currentCollection }) => {
	const options = [
		"#FC76A1",
		"#DBBE56",
		"#E39264",
		"#D25A61",
		"#AE68E6",
		"#70C4BF",
		"#9E7F72"
	];

	const initialRef = useRef(null);
	const colorPicker = useRef(null);
	const toast = useToast();
	const auth = useAuth();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();
	const [collectionColor, setCollectionColor] = useState(
		currentCollection?.collectionColor
	);

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "collection-color",
		defaultValue: null,
		onChange: setCollectionColor
	});

	const onEditCollection = ({ name }) => {
		const newCollection = {
			name,
			collectionColor: collectionColor
				? collectionColor
				: currentCollection.collectionColor
		};

		editCollection(currentCollection.id, newCollection);
		toast({
			title: "Success!",
			description: "We've added your collection.",
			status: "success",
			position: "top",
			duration: 3000,
			isClosable: true
		});
		mutate("/api/todo-collections", auth.user.uid);
		mutate(["/api/todo-collections", auth.user.uid], async (data) => {
			return await getUserCollections(auth.user.uid);
		});
		onClose();
		setTimeout(() => {
			router.push(`/collection/${currentCollection.id}`);
		}, 100);
	};

	return (
		<>
			<div
				onClick={onOpen}
				className='default-focus flex flex-row items-center w-full text-left text-white'
			>
				{children}
			</div>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onEditCollection)}
					bgColor='#1D1D27'
					borderRadius='20px'
					color='white'
				>
					<ModalHeader fontWeight='700'>Edit Collection</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								ref={initialRef}
								defaultValue={currentCollection?.name}
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
								<div className='grid grid-cols-6 gap-2 mt-2'>
									{options.map((value) => {
										const radio = getRadioProps({ value });
										return (
											<RadioCard
												color={value}
												key={value}
												{...radio}
											>
												{value}
											</RadioCard>
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
									onChange={() =>
										setCollectionColor(colorPicker.current.value)
									}
									defaultValue='#FC76A1'
									ref={colorPicker}
									type='color'
									id='colorPicker'
									name='colorPicker'
									className='w-16 h-12 p-0 mt-2 bg-transparent border-0 rounded-lg'
								/>
							</label>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							type='submit'
							bgColor='#3D3C50'
							fontWeight='600'
							px='5'
							_hover={{ bgColor: "#525166" }}
						>
							Update
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

export default EditCollectionModal;
