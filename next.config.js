/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "avatars.githubusercontent.com",
				protocol: "https",
			},
			{
				hostname: "images.pexels.com",
				protocol: "https",
			},
		],
	},
};

module.exports = nextConfig;
