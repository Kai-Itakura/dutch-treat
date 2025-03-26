-- DropForeignKey
ALTER TABLE "Settlement" DROP CONSTRAINT "Settlement_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
