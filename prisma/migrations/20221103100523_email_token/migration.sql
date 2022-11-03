-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailToken" TEXT;

-- CreateTable
CREATE TABLE "Movies" (
    "id" TEXT NOT NULL,
    "imdb_code" TEXT NOT NULL,
    "movie_path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);
