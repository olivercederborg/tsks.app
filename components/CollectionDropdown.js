import { useRef } from "react";
import { mutate } from "swr";
import { useToast } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

import DeleteCollectionButton from "./DeleteCollectionButton";
import { useDetectOutsideClick } from "@/utils/useDetectOutsideClick";
import EditCollectionModal from "./EditCollectionModal";

const CollectionDropdown = ({ currentCollection }) => {
	const toast = useToast();
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
	const onClick = () => setIsActive(!isActive);

	return (
		<div className='relative flex text-left'>
			<button
				onClick={onClick}
				className='default-focus hover:opacity-100 z-10 p-2 transition-opacity duration-200 ease-in-out rounded-lg opacity-50'
			>
				<FiMoreHorizontal className='text-xl' />
			</button>

			<div
				ref={dropdownRef}
				className={`origin-top-right absolute right-0 top-10 z-50 mt-2 w-56 rounded-md shadow-lg bg-secondary-background ring-1 ring-black ring-opacity-5 divide-y divide-primary-background ${
					isActive ? "visible" : "invisible"
				}`}
				role='menu'
				aria-orientation='vertical'
				aria-labelledby='options-menu'
			>
				<div className='py-1'>
					<button
						className='default-focus hover:bg-secondary-card block w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						<EditCollectionModal currentCollection={currentCollection}>
							Edit Collection
						</EditCollectionModal>
					</button>
				</div>
				<div className='py-1'>
					<button
						className='default-focus hover:bg-secondary-card block w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						<DeleteCollectionButton
							currentCollection={currentCollection}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CollectionDropdown;
