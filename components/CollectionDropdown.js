import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { useToast } from "@chakra-ui/react";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";

import DeleteCollectionButton from "./DeleteCollectionButton";
import { useDetectOutsideClick } from "@/utils/useDetectOutsideClick";
import EditCollectionModal from "./EditCollectionModal";
import { favouriteCollection, unFavouriteCollection } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { compareAsc, parseISO } from "date-fns";

const CollectionDropdown = ({ currentCollection }) => {
	const { user } = useAuth();
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
	const onClick = () => setIsActive(!isActive);
	const [isFavouriteCollection, setIsFavouriteCollection] = useState(null);

	useEffect(() => {
		setIsFavouriteCollection(currentCollection?.isFavourite);
	}, [currentCollection]);

	const onFavouriteCollection = () => {
		favouriteCollection(currentCollection.id);
		currentCollection.isFavourite = true;
		setIsFavouriteCollection(true);
		const newCollection = {
			isFavourite: true,
			...currentCollection
		};
		mutate(
			["/api/todo-collections", user.uid],
			async (data) => {
				const oldCollections = data.collections.filter(
					(collection) => collection.id !== currentCollection.id
				);

				const collections = [
					...oldCollections,
					{ id: currentCollection.id, ...newCollection }
				];

				collections.sort((a, b) =>
					compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
				);

				return { collections };
			},
			false
		);
	};

	const onUnFavouriteCollection = () => {
		unFavouriteCollection(currentCollection.id);
		setIsFavouriteCollection(false);
		currentCollection.isFavourite = false;
		const newCollection = {
			isFavourite: false,
			...currentCollection
		};
		mutate(
			["/api/todo-collections", user.uid],
			async (data) => {
				const oldCollections = data.collections.filter(
					(collection) => collection.id !== currentCollection.id
				);

				const collections = [
					...oldCollections,
					{ id: currentCollection.id, ...newCollection }
				];

				collections.sort((a, b) =>
					compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
				);

				return { collections };
			},
			false
		);
	};

	return (
		<div className='relative flex ml-auto mr-0'>
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
							<FiEdit className='mr-2 text-lg' />
							Edit Collection
						</EditCollectionModal>
					</button>
				</div>
				{isFavouriteCollection && (
					<div className='py-1'>
						<button
							onClick={onUnFavouriteCollection}
							className='default-focus items hover:bg-secondary-card flex w-full px-4 py-2 text-sm text-left text-gray-200'
							role='menuitem'
						>
							<AiOutlineStar className='mr-2 text-lg' />
							Unfavourite Collection
						</button>
					</div>
				)}
				{!isFavouriteCollection && (
					<div className='py-1'>
						<button
							onClick={onFavouriteCollection}
							className='default-focus items hover:bg-secondary-card flex w-full px-4 py-2 text-sm text-left text-gray-200'
							role='menuitem'
						>
							<AiFillStar className='mr-2 text-lg' />
							Favourite Collection
						</button>
					</div>
				)}
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
