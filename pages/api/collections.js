import { auth } from "@/lib/firebase-admin";
import { getUserCollections, getAllCollections } from "@/lib/db-admin";

export default async (_, res) => {
	// console.log(req.headers);
	// const uid = req.headers.uid;
	// const { collections } = await getUserCollections(uid);
	const { collections } = await getAllCollections();

	return res.status(200).json({ collections });
};
