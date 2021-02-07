import { auth } from "@/lib/firebase";
import { getCollectionTodos } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const { user_id } = await auth.verifyIdToken(req.headers.token);
		const { todos } = await getCollectionTodos(user_id);

		// console.log(todos);

		res.status(200).json({ todos });
	} catch (error) {
		res.status(500).json({ error });
	}
};
