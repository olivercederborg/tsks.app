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
import { useAuth } from "@/lib/auth";
import { updateDisplayName } from "@/lib/db";
import { getUser } from "@/lib/db-admin";

const UpdateDisplayName = ({ user }) => {
	const { updateUserName } = useAuth();
	const initialRef = useRef(null);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();

	const onUpdateName = ({ name }) => {
		updateUserName(name);
		updateDisplayName(user.uid, name);
		console.log(`Update ${user.uid} to ${name}`);

		toast({
			title: "Success!",
			description: "Your Display Name was updated.",
			status: "success",
			position: "top",
			duration: 5000,
			isClosable: true
		});

		setTimeout(() => {
			mutate(["/api/userdata", user.uid], async () => {
				return getUser(user.uid);
			});
		}, 100);

		onClose();
	};

	return (
		<>
			<button
				onClick={onOpen}
				className='bg-ligther-gray-button hover:bg-gray-button px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-md'
			>
				{user?.name ? "Edit" : "Set Name"}
			</button>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onUpdateName)}
					bgColor='#1D1D27'
					borderRadius='20px'
					color='white'
					pt='2'
					mx='5'
				>
					<ModalHeader fontWeight='700'>Update Name</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>New name</FormLabel>
							<Input
								ref={initialRef}
								defaultValue={user?.name}
								placeholder='Jane Doe'
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
							Update
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

export default UpdateDisplayName;
