import { PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";
import { json } from "@remix-run/node";

// Hard-code a unique key, so we can look up the client when this module gets re-imported

   
const prisma = singleton("prisma", () => new PrismaClient());
prisma.$connect();

if(prisma === undefined || prisma === null) {
    throw json({message: 'No db connected' }, { status: 404, statusText: 'Not Found' });
}

export { prisma };
