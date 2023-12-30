"use client";
import React from "react";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import { useUppy } from "@/components/uppy-provider";

export default function Component() {
	const { uppy } = useUppy();

	return (
		<div className="mx-auto">
			<Dashboard uppy={uppy} id="testng" plugins={["Webcam"]} />
		</div>
	);
}
