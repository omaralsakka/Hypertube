/*
  Warnings:

  - Made the column `firstLogin` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstLogin" SET NOT NULL;
