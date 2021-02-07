import { auth } from "@/lib/firebase";
import { getCollectionTodos } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const { uid } = await auth.verifyIdToken(req.headers.token);
		const { todos } = await getCollectionTodos(uid);

		// console.log(todos);

		res.status(200).json({ todos });
	} catch (error) {
		res.status(500).json({ error });
	}
};
