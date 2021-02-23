import { getFavouriteCollections } from "@/lib/db-admin";

export default async (req, res) => {
	const uid = req.headers.uid;
	const { collections } = await getFavouriteCollections(uid);

	return res.status(200).json({ collections });
};
