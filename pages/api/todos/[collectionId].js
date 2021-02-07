import { getAllTodos } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const collectionId = req.query.collectionId;
		const { todos, error } = await getAllTodos(collectionId);

		res.status(200).json({ todos });
	} catch (error) {
		res.status(500).json({ error });
	}
};
