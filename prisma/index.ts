import { PrismaClient } from ".prisma/client";
import app from "./app";
const prisma = new PrismaClient();

async function main() {
  app.listen(3004, () =>
    console.log("REST API server ready at: http://localhost:3000/v1")
  );
}

main()
  .catch((e) => {
    throw e;
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
