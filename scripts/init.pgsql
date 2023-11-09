CREATE TABLE IF NOT EXISTS
  "countries" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "brands" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
  );

CREATE UNIQUE INDEX IF NOT EXISTS "countries_name_key" ON "countries" ("name");

CREATE UNIQUE INDEX IF NOT EXISTS "categories_name_key" ON "categories" ("name");

CREATE UNIQUE INDEX IF NOT EXISTS "brands_name_key" ON "brands" ("name");
