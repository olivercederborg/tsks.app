import { useRef } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
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

import { editTodo } from "@/lib/db";
import { getPendingTodos } from "@/lib/db-admin";

const EditTodoModal = ({ children, todoId, collectionId }) => {
	const initialRef = useRef(null);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();

	const onEditTodo = ({ name }) => {
		const newTodo = {
			name
		};
		editTodo(todoId, newTodo);

		toast({
			title: "Success!",
			description: "Your task was updated.",
			status: "success",
			position: "top",
			duration: 3000,
			isClosable: true
		});

		mutate(["/api/todos", collectionId], async (data) => {
			return await getPendingTodos(collectionId);
		});

		onClose();
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
					onSubmit={handleSubmit(onEditTodo)}
					bgColor='#1D1D27'
					borderRadius='20px'
					color='white'
					pt='2'
				>
					<ModalHeader fontWeight='700'>Edit task</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>New task</FormLabel>
							<Input
								ref={initialRef}
								placeholder='Do the dishes'
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
							Edit
						</Button>
						<Button
							onClick={onClose}
							ml={3}
							fontWeight='600'
							px='5'
							bgColor='transparent'
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

export default EditTodoModal;
