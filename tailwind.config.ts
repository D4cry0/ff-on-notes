import withMT from "@material-tailwind/react/utils/withMT";
import type { Config } from 'tailwindcss';

module.exports = withMT({
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

