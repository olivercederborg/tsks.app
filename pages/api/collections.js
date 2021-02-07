import { auth } from "@/lib/firebase-admin";
import { getUserCollections } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const { user_id } = await auth.verifyIdToken(req.headers.token);
		const { collections } = await getUserCollections(user_id ?? null);

		return res.status(200).json({ collections });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
