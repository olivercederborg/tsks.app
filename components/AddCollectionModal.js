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
import { createCollection } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const AddCollectionModal = ({ children }) => {
	const options = ["purple", "yellow", "teal", "rose"];

	const initialRef = useRef(null);
	const toast = useToast();
	const auth = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();
	const [collectionColor, setCollectionColor] = useState("purple");

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "collection-color",
		defaultValue: "purple",
		onChange: setCollectionColor
	});
	const group = getRootProps();

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
			duration: 5000,
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
				className='default-focus hover:bg-primary-default rounded-2xl hover:border-primary-default border-secondary-card border-3 focus:outline-none flex flex-row items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-200 ease-in-out bg-transparent'
			>
				{children}
			</button>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onCreateCollection)}
					bgColor='#191B21'
					borderRadius='20px'
					color='white'
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
								borderColor='#333644'
								py='5'
								px='4'
								borderRadius='12px'
								name='name'
								mb='6'
								_hover={{ borderColor: "#464957" }}
								ref={register({ required: true })}
							/>
							<label>
								Color
								<div className='flex'>
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
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							type='submit'
							bgColor='#7578D1'
							fontWeight='600'
							px='5'
							_hover={{ bgColor: "#9396F3" }}
						>
							Create
						</Button>
						<Button
							onClick={onClose}
							ml={3}
							bgColor='#333644'
							fontWeight='600'
							px='5'
							_hover={{ bgColor: "#3E4255" }}
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
