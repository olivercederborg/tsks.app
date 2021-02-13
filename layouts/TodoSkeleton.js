import React from "react";
import { Box, Skeleton } from "@chakra-ui/react";

const TodoSkeleton = () => {
	return (
		<>
			<Skeleton
				borderRadius='8px'
				startColor='#21212B'
				endColor='#343343'
				h='24px'
				w='110px'
				mb='4'
			/>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='48px'
				my='2'
			/>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='48px'
				my='2'
			/>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='48px'
				my='2'
			/>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='48px'
				my='2'
			/>
			<Skeleton
				borderRadius='8px'
				startColor='#21212B'
				endColor='#343343'
				h='24px'
				w='130px'
				mt='8'
				mb='4'
			/>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='48px'
				my='2'
			/>
			<Skeleton
				borderRadius='16px'
				startColor='#21212B'
				endColor='#343343'
				h='48px'
				my='2'
			/>
		</>
	);
};

export default TodoSkeleton;
