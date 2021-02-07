import { getAllTodos } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const uid = req.headers.uid;
		const { todos } = await getAllTodos(uid);

		res.status(200).json({ todos });
	} catch (error) {
		res.status(500).json({ error });
	}
};
