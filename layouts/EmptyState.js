import AddCollectionModal from "@/components/AddCollectionModal";
import { MdLabel } from "react-icons/md";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import { getUserTodos } from "@/lib/db-admin";
import { useAuth } from "@/lib/auth";
import PendingTodos from "../components/CollectionPendingTodos";

export default function EmptyState({ collections }) {
	const { user } = useAuth();

	return (
		<>
			<div className='flex flex-col items-center justify-center mt-20'>
				<h1 className='mb-10 text-3xl font-medium'>
					You have no collections.
				</h1>
				<AddCollectionModal>Add Your First Collection</AddCollectionModal>
			</div>
		</>
	);
}
