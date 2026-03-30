import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: [".next/", "node_modules/", ".claude/"] },
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
);
