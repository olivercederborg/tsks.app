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
	useToast,
	Alert,
	AlertIcon
} from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import { updateEmail } from "@/lib/db";
import { getUser } from "@/lib/db-admin";

const UpdateUserEmail = ({ user }) => {
	const { updateUserEmail, error } = useAuth();
	const initialRef = useRef(null);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();

	if (error) {
		console.log("Error happened", error);
	}

	const onUpdateEmail = ({ name }) => {
		updateEmail(user.uid, name);
		updateUserEmail(name);
		console.log(`Update ${user.uid} email to ${name}`);

		toast({
			title: "Success!",
			description: "Your email was updated.",
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
				className='bg-ligther-gray-button px-4 py-2 text-sm font-medium rounded-md'
			>
				Change
			</button>
			{error?.code == "auth/requires-recent-login" && (
				<Alert bgColor='red.400' borderRadius='12px' status='error' mb='4'>
					<AlertIcon color='white' />
					Log out and in again to change your email.
				</Alert>
			)}
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onUpdateEmail)}
					bgColor='#1D1D27'
					borderRadius='20px'
					color='white'
					pt='2'
					mx='5'
				>
					<ModalHeader fontWeight='700'>Update Email</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>New email</FormLabel>
							<Input
								ref={initialRef}
								defaultValue={user?.email}
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

export default UpdateUserEmail;
