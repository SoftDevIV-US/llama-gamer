CREATE EXTENSION IF NOT EXISTS citext;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TYPE IF EXISTS "Role" CASCADE;

CREATE TYPE "Role" AS ENUM('ADMIN', 'USER');

DROP TYPE IF EXISTS "PurchaseStatus" CASCADE;

CREATE TYPE "PurchaseStatus" AS ENUM('IN_COMING', 'PENDING', 'CANCELED');

CREATE TABLE IF NOT EXISTS
  "countries" (
    "id" UUID NOT NULL,
    "name" CITEXT NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "categories" (
    "id" UUID NOT NULL,
    "name" CITEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "brands" (
    "id" UUID NOT NULL,
    "name" CITEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "suppliers" (
    "id" UUID NOT NULL,
    "email" CITEXT NOT NULL,
    "delivery_time" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country_id" UUID NOT NULL,
    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" CITEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "penalties" (
    "id" UUID NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    CONSTRAINT "penalties_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "wish_lists" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'My WishList',
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    CONSTRAINT "wish_lists_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "purchases" (
    "id" UUID NOT NULL,
    "total_cost" DOUBLE PRECISION NOT NULL,
    "delivery_day" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "PurchaseStatus" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "products" (
    "id" UUID NOT NULL,
    "name" CITEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "stock" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" UUID NOT NULL,
    "brand_id" UUID NOT NULL,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "product_images" (
    "id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" UUID NOT NULL,
    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS
  "products_suppliers" (
    "product_id" UUID NOT NULL,
    "supplier_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "products_suppliers_pkey" PRIMARY KEY ("product_id", "supplier_id")
  );

CREATE TABLE IF NOT EXISTS
  "wish_lists_products" (
    "wish_list_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wish_lists_products_pkey" PRIMARY KEY ("wish_list_id", "product_id")
  );

CREATE TABLE IF NOT EXISTS
  "users_products" (
    "user_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_products_pkey" PRIMARY KEY ("user_id", "product_id")
  );

CREATE TABLE IF NOT EXISTS
  "purchases_products" (
    "purchase_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "purchases_products_pkey" PRIMARY KEY ("purchase_id", "product_id")
  );

CREATE UNIQUE INDEX IF NOT EXISTS "countries_name_key" ON "countries" ("name");

CREATE UNIQUE INDEX IF NOT EXISTS "categories_name_key" ON "categories" ("name");

CREATE UNIQUE INDEX IF NOT EXISTS "brands_name_key" ON "brands" ("name");

CREATE UNIQUE INDEX IF NOT EXISTS "suppliers_email_key" ON "suppliers" ("email");

CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" ("email");

CREATE UNIQUE INDEX IF NOT EXISTS "penalties_user_id_key" ON "penalties" ("user_id");

CREATE UNIQUE INDEX IF NOT EXISTS "wish_lists_user_id_key" ON "wish_lists" ("user_id");

CREATE UNIQUE INDEX IF NOT EXISTS "products_name_key" ON "products" ("name");

ALTER TABLE "suppliers"
DROP CONSTRAINT IF EXISTS "suppliers_country_id_fkey";

ALTER TABLE "suppliers"
ADD CONSTRAINT "suppliers_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "penalties"
DROP CONSTRAINT IF EXISTS "penalties_user_id_fkey";

ALTER TABLE "penalties"
ADD CONSTRAINT "penalties_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "wish_lists"
DROP CONSTRAINT IF EXISTS "wish_lists_user_id_fkey";

ALTER TABLE "wish_lists"
ADD CONSTRAINT "wish_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "purchases"
DROP CONSTRAINT IF EXISTS "purchases_user_id_fkey";

ALTER TABLE "purchases"
ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products"
DROP CONSTRAINT IF EXISTS "products_category_id_fkey";

ALTER TABLE "products"
ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products"
DROP CONSTRAINT IF EXISTS "products_brand_id_fkey";

ALTER TABLE "products"
ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "product_images"
DROP CONSTRAINT IF EXISTS "product_images_product_id_fkey";

ALTER TABLE "product_images"
ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products_suppliers"
DROP CONSTRAINT IF EXISTS "products_suppliers_product_id_fkey";

ALTER TABLE "products_suppliers"
ADD CONSTRAINT "products_suppliers_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products_suppliers"
DROP CONSTRAINT IF EXISTS "products_suppliers_supplier_id_fkey";

ALTER TABLE "products_suppliers"
ADD CONSTRAINT "products_suppliers_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "wish_lists_products"
DROP CONSTRAINT IF EXISTS "wish_lists_products_wish_list_id_fkey";

ALTER TABLE "wish_lists_products"
ADD CONSTRAINT "wish_lists_products_wish_list_id_fkey" FOREIGN KEY ("wish_list_id") REFERENCES "wish_lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "wish_lists_products"
DROP CONSTRAINT IF EXISTS "wish_lists_products_product_id_fkey";

ALTER TABLE "wish_lists_products"
ADD CONSTRAINT "wish_lists_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "users_products"
DROP CONSTRAINT IF EXISTS "users_products_user_id_fkey";

ALTER TABLE "users_products"
ADD CONSTRAINT "users_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "users_products"
DROP CONSTRAINT IF EXISTS "users_products_product_id_fkey";

ALTER TABLE "users_products"
ADD CONSTRAINT "users_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "purchases_products"
DROP CONSTRAINT IF EXISTS "purchases_products_purchase_id_fkey";

ALTER TABLE "purchases_products"
ADD CONSTRAINT "purchases_products_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "purchases_products"
DROP CONSTRAINT IF EXISTS "purchases_products_product_id_fkey";

ALTER TABLE "purchases_products"
ADD CONSTRAINT "purchases_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
