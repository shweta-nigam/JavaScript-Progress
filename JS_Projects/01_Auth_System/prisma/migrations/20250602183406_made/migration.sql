-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accessToken" DROP NOT NULL,
ALTER COLUMN "accessTokenExpiry" DROP NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "refreshTokenExpiry" DROP NOT NULL;
