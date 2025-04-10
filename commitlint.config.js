export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation changes
        "style", // Code formatting, no logic
        "refactor", // Code change without fixing a bug or adding a feature
        "perf", // Performance improvement
        "test", // Adding or updating tests
        "build", // Build system change
        "ci", // CI/CD config changes
        "chore", // Other changes
        "revert", // Revert to previous commit
        "merge", // Merge commits

        // 👇 Optional Monorepo Specific Types
        "web", // Frontend-only change
        "server", // Backend-only change
        "pkg", // Shared package change
        "infra", // Turborepo infra/tooling change
      ],
    ],
    "subject-case": [1, "always", "sentence-case"],
    "scope-enum": [1, "always", ["web", "server", "utils", "root"]],
  },
};
