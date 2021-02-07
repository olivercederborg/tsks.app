import { useAuth } from "@/lib/auth";
import AddCollectionModal from "@/components/AddCollectionModal";
import { MdLabel } from "react-icons/md";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function DashboardShell({ children }) {
	return (
		<>
			<main className='flex flex-col items-center min-h-screen text-white bg-gray-900'>
				<section className='mt-14 container min-h-screen'>
					<h1 className='text-4xl font-bold'>Collections</h1>
					{children}
				</section>
			</main>
		</>
	);
}
