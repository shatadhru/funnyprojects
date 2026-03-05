const {PrismaClient , Prisma} = require("../generated/prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
require("dotenv").config({ path: ['.env.local', '.env'] });

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: pool })


module.exports = prisma;