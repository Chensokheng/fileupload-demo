import React from "react";
import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default async function BlurImage({
	src,
	className,
	height,
	width,
}: {
	src: string;
	className?: string;
	height: number;
	width: number;
}) {
	const res = await fetch(src + "&w=10");
	const buffer = await res.arrayBuffer();
	const imageBuffer = Buffer.from(buffer);
	const blurPlaceHolder = await getPlaiceholder(imageBuffer);

	return (
		<div className={className}>
			<Image
				placeholder="blur"
				src={src}
				alt="image"
				blurDataURL={blurPlaceHolder.base64}
				width={width}
				height={height}
				sizes="250px"
				className={cn("rounded-md border")}
				suppressHydrationWarning
			/>
		</div>
	);
}
