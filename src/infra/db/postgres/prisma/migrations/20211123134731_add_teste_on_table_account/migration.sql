/*
  Warnings:

  - Added the required column `teste` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "teste" TEXT NOT NULL;
