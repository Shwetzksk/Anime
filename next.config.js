/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.myanimelist.net"],
    unoptimized: true,
  },
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     "/": { page: "/" },
  //     "/anime/1": { page: "/anime", query: { id: "1" } },
  //     "/anime/5": { page: "/anime", query: { id: "5" } },
  //     "/anime/6": { page: "/anime", query: { id: "6" } },
  //   };
  // },
};

module.exports = nextConfig;
