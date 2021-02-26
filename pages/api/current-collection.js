import { getCollection } from "@/lib/db-admin";

export default async (req, res) => {
	const uid = req.headers.uid;
	const { collection } = await getCollection(uid);

	return res.status(200).json({ collection });
};
