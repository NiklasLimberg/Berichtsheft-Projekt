/*
  Warnings:

  - You are about to drop the column `token` on the `RefreshToken` table. All the data in the column will be lost.
  - Added the required column `tokenId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RefreshToken.token_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identificationString" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RefreshToken" ("id", "identificationString", "updatedAt", "userId") SELECT "id", "identificationString", "updatedAt", "userId" FROM "RefreshToken";
DROP TABLE "RefreshToken";
ALTER TABLE "new_RefreshToken" RENAME TO "RefreshToken";
CREATE UNIQUE INDEX "RefreshToken.tokenId_unique" ON "RefreshToken"("tokenId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
