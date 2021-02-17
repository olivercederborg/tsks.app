import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useToast
} from "@chakra-ui/react";

import { deleteCollection } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { BiTrash } from "react-icons/bi";

const DeleteCollectionButton = ({ currentCollection }) => {
	const router = useRouter();
	const toast = useToast();
	const { user } = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onDelete = () => {
		toast({
			title: "Collection deleted.",
			position: "top",
			status: "success",
			duration: 3000,
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
		router.push("/app");
	};

	return (
		<>
			<div className='flex items-center text-red-400' onClick={onOpen}>
				<BiTrash className='mr-2 text-lg' />
				Delete Collection
			</div>

			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent color='white' bgColor='#191B21' borderRadius='20px'>
					<ModalHeader>Delete collection</ModalHeader>
					<ModalCloseButton />
					<ModalBody opacity='65%' pb={6}>
						Are you sure you want to delete?
						<br />
						This action cannot be undone.
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
