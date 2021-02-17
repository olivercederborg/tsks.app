import React from "react";
import { Box, Skeleton } from "@chakra-ui/react";

const CollectionsSkeleton = () => {
	return (
		<>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='36px'
				w='180px'
			></Skeleton>
			<div className='md:grid-cols-2 grid items-start grid-cols-1 gap-4 mt-10'>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='138px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='138px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='138px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='138px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='138px'
				></Skeleton>
				<Skeleton
					borderRadius='16px'
					startColor='#21212B'
					endColor='#343343'
					h='54px'
				></Skeleton>
			</div>
		</>
	);
};

export default CollectionsSkeleton;
