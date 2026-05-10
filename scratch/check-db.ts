import { PrismaClient } from '../../server/src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const destinations = await prisma.destination.findMany({
    select: { id: true, name: true, country: true, isPublished: true }
  });

  console.log('Destinations:', JSON.stringify(destinations, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
