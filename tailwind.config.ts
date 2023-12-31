import type { Config } from 'tailwindcss'
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config );

