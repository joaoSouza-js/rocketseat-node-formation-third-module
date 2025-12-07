-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "gym_Id" TEXT,
ADD COLUMN     "user_Id" TEXT;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gym_Id_fkey" FOREIGN KEY ("gym_Id") REFERENCES "gyms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
