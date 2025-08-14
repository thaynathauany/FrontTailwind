/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // unoptimized: true,
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_API_URL
        ? [{ hostname: process.env.NEXT_PUBLIC_API_URL.split("/").pop() }]
        : []),
      { hostname: "placehold.co" },
    ],
  },
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            svgo: true,
            svgoConfig: {
              plugins: [
                { name: "removeAttrs", params: { attrs: "(fill|style)" } },
                { name: "removeDimensions", active: true },
              ],
            },
            svgProps: {
              stroke: "currentColor",
              fill: "none",
            },
          },
        },
      ],
    });

    config.externals = [...(config.externals || []), { canvas: "canvas" }];

    return config;
  },
};

export default nextConfig;
