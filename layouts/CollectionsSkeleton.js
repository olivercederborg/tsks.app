import React from "react";
import { Box, Skeleton } from "@chakra-ui/react";

const CollectionsSkeleton = () => {
	return (
		<>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='32px'
				w='180px'
			></Skeleton>
			<div className='flex space-x-4'>
				<Skeleton
					borderRadius='12px'
					startColor='#21212B'
					endColor='#343343'
					h='44px'
					w='104px'
					mt='56px'
				></Skeleton>
				<Skeleton
					borderRadius='12px'
					startColor='#21212B'
					endColor='#343343'
					h='44px'
					w='130px'
					mt='56px'
				></Skeleton>
			</div>
			<div className='md:grid-cols-3 grid items-start grid-cols-2 gap-4 mt-10'>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='190px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='190px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='190px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='190px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='190px'
				></Skeleton>
				<Skeleton
					borderRadius='24px'
					startColor='#21212B'
					endColor='#343343'
					h='88px'
				></Skeleton>
			</div>
		</>
	);
};

export default CollectionsSkeleton;
