"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import Webcam from "@uppy/webcam";
import { UPPY_BUCKET, UPPY_TUS_ENDPOINT } from "@/lib/constant";

// Define the shape of your context
interface AppContextProps {
	// Add your global state properties here
	uppy: Uppy;
}

// Create the initial context with default values
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create a context provider component
interface AppProviderProps {
	children: ReactNode;
}

export const UppyProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [uppy] = useState(() =>
		new Uppy()
			.use(Tus, {
				endpoint: UPPY_TUS_ENDPOINT,
				headers: {
					Authorization:
						"Bearer " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
				},
				allowedMetaFields: [
					"bucketName",
					"objectName",
					"contentType",
					"cacheControl",
				],
			})
			.use(Webcam)
	);

	uppy.on("file-added", (file) => {
		file.meta = {
			...file.meta,
			bucketName: UPPY_BUCKET,
			objectName: file.name,
			contentType: file.type,
		};
	});

	// Provide the context value to the components
	return (
		<AppContext.Provider value={{ uppy }}>{children}</AppContext.Provider>
	);
};

// Custom hook for using the context
export const useUppy = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}

	return context;
};
