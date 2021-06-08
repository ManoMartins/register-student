import { courses } from './seeds/course';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  for (let course of courses) {
    await prisma.course.create({ 
      data: course,
    })
  }
}

main()
  .catch(e => console.log(e))
  .finally(async () => await prisma.$disconnect());
