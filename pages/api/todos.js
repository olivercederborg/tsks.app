import { auth } from "@/lib/firebase";
import { getCollectionTodos } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const { uid } = await auth.verifyIdToken(req.headers.uid);
		const { todos } = await getCollectionTodos(user_id);

		// console.log(todos);

		res.status(200).json({ todos });
	} catch (error) {
		res.status(500).json({ error });
	}
};
