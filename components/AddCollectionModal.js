import { useRef } from "react";
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
	useToast
} from "@chakra-ui/react";

import { createCollection } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const AddCollectionModal = ({ children }) => {
	const initialRef = useRef();
	const toast = useToast();
	const auth = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();

	const onCreateCollection = ({ name }) => {
		const newCollection = {
			authorId: auth.user.uid,
			createdAt: new Date().toISOString(),
			name
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
				className='hover:bg-primary-default rounded-xl hover:border-primary-default border-secondary-card flex flex-row items-center justify-center px-6 py-3 font-semibold text-white transition-colors duration-200 ease-in-out bg-transparent border-2'
			>
				{children}
			</button>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onCreateCollection)}
					bg='#21232D'
					borderRadius='15px'
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
								borderRadius='10px'
								name='name'
								_hover={{ borderColor: "#464957" }}
								ref={register({ required: true })}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							onClick={onClose}
							mr={3}
							bgColor='#333644'
							fontWeight='600'
							px='5'
							_hover={{ bgColor: "#3E4255" }}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							bgColor='#7578D1'
							fontWeight='600'
							px='5'
							_hover={{ bgColor: "#9396F3" }}
						>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddCollectionModal;
