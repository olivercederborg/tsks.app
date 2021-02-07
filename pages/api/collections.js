import { auth } from "@/lib/firebase-admin";
import { getUserCollections } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const { uid } = await auth.verifyIdToken(req.headers.token);
		const { collections } = await getUserCollections(uid);

		return res.status(200).json({ collections });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
