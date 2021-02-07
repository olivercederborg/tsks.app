import { auth } from "@/lib/firebase-admin";
import { getUserCollections } from "@/lib/db-admin";

export default async (req, res) => {
	const { user_id } = await auth.verifyIdToken(req.headers.token);
	console.log(user_id);
	const { collections } = await getUserCollections(user_id);

	return res.status(200).json({ collections });
};
