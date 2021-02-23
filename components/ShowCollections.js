import { useEffect, useState } from "react";
import FavouriteCollections from "./FavouriteCollections";
import ShowAllCollectons from "./ShowAllCollections";

export default function ShowCollections({ collections }) {
	const initialFavourites = JSON.parse(
		window.localStorage.getItem("favouritesActive") ?? false
	);
	const initialAll = JSON.parse(
		window.localStorage.getItem("allActive") ?? true
	);
	const [favouritesActive, setFavouritesActive] = useState(initialFavourites);
	const [allActive, setAllActive] = useState(initialAll);

	useEffect(() => {
		window.localStorage.setItem("favouritesActive", favouritesActive);
		window.localStorage.setItem("allActive", allActive);
	}, [allActive, favouritesActive]);

	return (
		<>
			<h1 className='text-2xl font-bold'>Collections</h1>
			<div className='mt-14 space-x-4'>
				<button
					onClick={() => {
						setAllActive(false);
						setFavouritesActive(true);
					}}
					className={`default-focus border-primary-card rounded-xl px-4 py-2.5 text-sm border-2 ${
						favouritesActive && "bg-gray-button border-gray-button"
					}`}
				>
					Favourites
				</button>
				<button
					onClick={() => {
						setFavouritesActive(false);
						setAllActive(true);
					}}
					className={`default-focus border-primary-card rounded-xl px-4 py-2.5 text-sm border-2 ${
						allActive && "bg-gray-button border-gray-button"
					}`}
				>
					All Collections
				</button>
			</div>
			{allActive && <ShowAllCollectons collections={collections} />}
			{favouritesActive && <FavouriteCollections />}
		</>
	);
}
