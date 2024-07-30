/*
  Warnings:

  - You are about to drop the column `caracteristics` on the `pets` table. All the data in the column will be lost.
  - Added the required column `characteristics` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "caracteristics",
ADD COLUMN     "characteristics" TEXT NOT NULL;
