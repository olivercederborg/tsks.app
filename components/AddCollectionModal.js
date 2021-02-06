import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton
} from "@chakra-ui/react";

const AddCollectionModal = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef();
	const finalRef = React.useRef();

	return (
		<>
			<Button onClick={onOpen}>{children}</Button>
			<Button ml={4} ref={finalRef}>
				I'll receive focus on close
			</Button>

			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your account</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>First name</FormLabel>
							<Input ref={initialRef} placeholder='First name' />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Last name</FormLabel>
							<Input placeholder='Last name' />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddCollectionModal;
