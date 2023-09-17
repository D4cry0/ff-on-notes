import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesHome from "~/styles/home.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesHome }];

export default function Index() {
  return (
    <main id='content'>
      <h1>FOMO Notex</h1>
      <p>Notas seguras</p>
      <p id='cta'>
        <Link to="/notes">My notes</Link>
      </p>
    </main>
  );
}
