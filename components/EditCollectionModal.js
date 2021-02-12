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
	const options = ["purple", "yellow", "teal", "rose"];

	const initialRef = useRef(null);
	const toast = useToast();
	const auth = useAuth();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();
	const [collectionColor, setCollectionColor] = useState("purple");

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "collection-color",
		defaultValue: "purple",
		onChange: setCollectionColor
	});

	const onEditCollection = ({ name }) => {
		const newCollection = {
			name,
			collectionColor
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
				className='default-focus flex flex-row w-full text-left text-white'
			>
				{children}
			</div>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					as='form'
					onSubmit={handleSubmit(onEditCollection)}
					bgColor='#191B21'
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
							Update
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

export default EditCollectionModal;
