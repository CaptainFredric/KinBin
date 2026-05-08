import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "KinBin";

const nextConfig: NextConfig = {
  output: isGitHubActions ? "export" : undefined,
  basePath: isGitHubActions ? `/${repoName}` : undefined,
  assetPrefix: isGitHubActions ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
