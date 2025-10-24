import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
    console.log('🌱 Starting database seed...');

    // Limpar dados existentes (opcional)
    // await prisma.user.deleteMany();

    // Criar usuários de exemplo
    const user1 = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: 'hashed_password_here', // Lembre-se de usar hash real em produção
            active: true,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            name: 'Regular User',
            password: 'hashed_password_here',
            active: true,
        },
    });

    console.log('✅ Seed completed successfully!');
    console.log({ user1, user2 });
}

main()
    .catch(e => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
