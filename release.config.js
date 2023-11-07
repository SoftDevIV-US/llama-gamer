const config = {
  branches: [main],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: [
          "package.json",
          "apps/e-commerce-api/dist/**/*.{js,js.map}",
          "apps/e-commerce-client/dist/**/*.{js,js.map}",
        ],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
