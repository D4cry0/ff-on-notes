# Migrations

## Update migrations file

npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/initial/migration.sql

## Apply migrations

npx prisma migrate deploy
