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
			description: "Your todo was updated.",
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
				className='default-focus flex flex-row w-full text-left text-white'
			>
				{children}
			</div>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onEditTodo)}
					bgColor='#191B21'
					borderRadius='20px'
					color='white'
				>
					<ModalHeader fontWeight='700'>Edit todo</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>New name</FormLabel>
							<Input
								ref={initialRef}
								placeholder='Do the dishes'
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
							Edit
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

export default EditTodoModal;
