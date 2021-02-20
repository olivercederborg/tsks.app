import { getUser } from "@/lib/db-admin";

export default async (req, res) => {
	try {
		const uid = req.headers.uid;
		const { userData } = await getUser(uid);

		res.status(200).json({ userData });
	} catch (error) {
		res.status(500).json({ error });
	}
};
