import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "FF On Notes" },
    { name: "FF On Notes", content: "Simple notes app." },
  ];
};

export default function Index() {
  return (
    <main id='content'>

    </main>
  );
}
