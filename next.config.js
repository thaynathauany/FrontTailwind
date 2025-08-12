/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
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
                // remove cor fixa e estilos inline, mas mantém stroke!
                { name: "removeAttrs", params: { attrs: "(fill|style)" } },
                { name: "removeDimensions", active: true },
              ],
            },
            // valores default; você pode ajustar por ícone depois
            svgProps: {
              stroke: "currentColor",
              fill: "none",
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
