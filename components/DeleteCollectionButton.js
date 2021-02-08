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
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/router";

import { deleteCollection } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const DeleteCollectionButton = ({ currentCollection }) => {
	const Router = useRouter();
	const toast = useToast();
	const { user } = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onDelete = () => {
		toast({
			title: "Collection deleted.",
			status: "success",
			duration: 5000,
			isClosable: true
		});
		deleteCollection(currentCollection.id);

		mutate(
			["/api/todo-collections", user.uid],
			async (data) => {
				return {
					collections: data.collections.filter(
						(collection) => collection.id !== currentCollection.id
					)
				};
			},
			false
		);
		setTimeout(() => Router.push("/dashboard"), 200);
	};

	// const onDelete = () => {
	// 	deleteCollection(currentCollection.id);

	// 	mutate(
	// 		["/api/todo-collections", user.uid],
	// 		async (data) => {
	// 			return {
	// 				collections: data.collections.filter(
	// 					(collection) => collection.id !== currentCollection.id
	// 				)
	// 			};
	// 		},
	// 		false
	// 	);
	// 	setTimeout(() => Router.push("/dashboard"), 500);
	// };

	return (
		<>
			<button
				onClick={onOpen}
				className='group bg-primary-card rounded-2xl hover:bg-red-500 focus:outline-none px-3 py-3 transition-all duration-200 ease-in-out'
			>
				<HiOutlineTrash className='group-hover:opacity-100 text-2xl transition-all duration-200 ease-in-out opacity-50' />
			</button>

			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent color='white' bgColor='#191B21' borderRadius='20px'>
					<ModalHeader>Are you sure?</ModalHeader>
					<ModalCloseButton />
					<ModalBody opacity='65%' pb={6}>
						You are about to delete your collection.
						<br />
						Do you wish to proceed?
					</ModalBody>

					<ModalFooter>
						<button
							onClick={onDelete}
							className='px-5 py-2 mr-3 font-semibold text-white bg-red-500 rounded-lg'
						>
							Delete
						</button>
						<button
							onClick={onClose}
							className='bg-secondary-card px-5 py-2 font-semibold text-white rounded-lg'
						>
							Cancel
						</button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteCollectionButton;
