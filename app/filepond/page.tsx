"use client";
import React from "react";

import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FILE_POND_BUCKET } from "@/lib/constant";

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType
);

export default function Page() {
	return (
		<div className=" w-1/2 mx-auto">
			<FilePond
				acceptedFileTypes={["image/*"]}
				allowMultiple={true}
				server={{
					process: async (
						fieldName,
						file,
						metadata,
						load,
						error,
						progress,
						abort
					) => {
						const formData = new FormData();
						formData.append(fieldName, file, file.name);
						const request = new XMLHttpRequest();
						request.open(
							"POST",
							`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${FILE_POND_BUCKET}/${file.name}`
						);
						request.setRequestHeader(
							"Authorization",
							// make sure to change and enforce your policy
							"Bearer " +
								process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
						);
						request.upload.onprogress = (e) => {
							progress(e.lengthComputable, e.loaded, e.total);
						};
						request.onload = function () {
							if (request.status >= 200 && request.status < 300) {
								load(request.responseText);
							} else {
								error("oh no");
							}
						};

						request.send(formData);

						return {
							abort: () => {
								request.abort();
								abort();
							},
						};
					},
					remove: async (fileId, load) => {
						// implementation here
					},
					revert: (source, load, error) => {
						// implementation here
					},
					load: async (source, load, error) => {
						// implementation here
					},
				}}
				name="files"
				labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
			/>
		</div>
	);
}
