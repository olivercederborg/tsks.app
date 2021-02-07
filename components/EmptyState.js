import AddCollectionModal from "@/components/AddCollectionModal";

export default function EmptyState() {
	return (
		<>
			<div className='flex flex-col items-center justify-center mt-32'>
				<h2 className='mb-10 text-3xl font-semibold'>
					You have no collections.
				</h2>
				<AddCollectionModal>Add Your First Collection</AddCollectionModal>
			</div>
		</>
	);
}
