import { useRef } from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
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
import { updateDbEmail } from "@/lib/db";
import { getUser } from "@/lib/db-admin";

const UpdateUserEmail = ({ user }) => {
	const { reauthUser, verifyEmail } = useAuth();
	const initialRef = useRef(null);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();

	const updateUserEmail = ({ newEmail, currentPassword }) => {
		reauthUser(currentPassword)
			.then(() => {
				firebase
					.auth()
					.currentUser.updateEmail(newEmail)
					.then(function () {
						toast({
							title: "Success!",
							description:
								"Your email was updated. Check your email to verify.",
							status: "success",
							position: "top",
							duration: 10000,
							isClosable: true
						});
						console.log("Email updated to", newEmail);
						updateDbEmail(user.uid, newEmail);
						setTimeout(() => {
							mutate(["/api/userdata", user.uid], async () => {
								return getUser(user.uid);
							});
						}, 500);
						onClose();
						verifyEmail();
					})
					.catch(function (error) {
						if (error?.code == "auth/requires-recent-login") {
							console.log("Error happened", error);
							toast({
								title: "Error",
								description:
									"You need to have logged in recently to change your email.",
								status: "error",
								position: "top",
								duration: 10000,
								isClosable: true
							});
						}
						if (error?.code == "auth/email-already-in-use") {
							toast({
								title: "Error",
								description: "That email is already in use.",
								status: "error",
								position: "top",
								duration: 10000,
								isClosable: true
							});
						}
					});
			})
			.catch((error) => {
				if (error.code == "auth/wrong-password") {
					toast({
						title: "Wrong password.",
						description: "The entered password is invalid.",
						status: "error",
						position: "top",
						duration: 10000,
						isClosable: true
					});
				}
				if (error.code == "auth/too-many-requests") {
					toast({
						title: "Too many failed attempts.",
						description:
							"You have entered the wrong password too many times. Try again later.",
						status: "error",
						position: "top",
						duration: 20000,
						isClosable: true
					});
				}
				console.log("FUCKING ERROR MATE", error);
			});
	};

	return (
		<>
			<button
				onClick={onOpen}
				className='bg-ligther-gray-button hover:bg-gray-button px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-md'
			>
				Change
			</button>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(updateUserEmail)}
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
								placeholder='contact@janedoe.com'
								border='3px solid'
								borderColor='#343343'
								py='5'
								px='4'
								borderRadius='12px'
								name='newEmail'
								id='newEmail'
								mb='6'
								_hover={{ borderColor: "#3D3C50" }}
								ref={register({ required: true })}
							/>
							<FormLabel>Current Password</FormLabel>
							<Input
								type='password'
								border='3px solid'
								borderColor='#343343'
								py='5'
								px='4'
								borderRadius='12px'
								name='currentPassword'
								id='currentPassword'
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
