
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const testPassword = await bcrypt.hash('johndoe123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@promovase.com' },
    update: {},
    create: {
      email: 'admin@promovase.com',
      name: 'Administrador',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // Create test user (as per requirements)
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: testPassword,
      role: Role.ADMIN,
    },
  });

  console.log('✅ Created admin users');

  // Create email providers configurations
  const mailchimpProvider = await prisma.emailProvider.upsert({
    where: { name: 'mailchimp' },
    update: {},
    create: {
      name: 'mailchimp',
      displayName: 'Mailchimp',
      isActive: false,
      configuration: {
        apiKey: '',
        listId: '',
        server: 'us1'
      }
    }
  });

  const convertKitProvider = await prisma.emailProvider.upsert({
    where: { name: 'convertkit' },
    update: {},
    create: {
      name: 'convertkit',
      displayName: 'ConvertKit',
      isActive: false,
      configuration: {
        apiKey: '',
        formId: '',
        apiSecret: ''
      }
    }
  });

  const customProvider = await prisma.emailProvider.upsert({
    where: { name: 'custom' },
    update: {},
    create: {
      name: 'custom',
      displayName: 'Custom Email System',
      isActive: true, // Default active provider
      configuration: {
        smtpHost: 'smtp.example.com',
        smtpPort: 587,
        smtpUser: '',
        smtpPass: ''
      }
    }
  });

  console.log('✅ Created email providers');

  // Create some sample leads
  const sampleLeads = [
    {
      email: 'maria@exemplo.com',
      name: 'Maria Silva',
      source: 'workshop',
      tags: ['workshop', 'interested'],
      customFields: { profession: 'Desenvolvedora', company: 'Tech Corp' }
    },
    {
      email: 'joao@exemplo.com',
      name: 'João Santos',
      source: 'ebook_1',
      tags: ['ebook', 'communication'],
      customFields: { profession: 'Analista', company: 'Business Inc' }
    },
    {
      email: 'ana@exemplo.com',
      name: 'Ana Costa',
      source: 'bundle',
      tags: ['bundle', 'premium'],
      customFields: { profession: 'Gerente', company: 'Startup XYZ' }
    },
    {
      email: 'pedro@exemplo.com',
      name: 'Pedro Oliveira',
      source: 'ebook_2',
      tags: ['ebook', 'roma-method'],
      customFields: { profession: 'Consultor', company: 'Freelancer' }
    },
    {
      email: 'carla@exemplo.com',
      name: 'Carla Ferreira',
      source: 'workshop',
      tags: ['workshop', 'leadership'],
      customFields: { profession: 'Diretora', company: 'Enterprise Ltd' }
    }
  ];

  for (const leadData of sampleLeads) {
    await prisma.lead.upsert({
      where: { email: leadData.email },
      update: {},
      create: {
        ...leadData,
        createdById: admin.id
      }
    });
  }

  console.log('✅ Created sample leads');

  // Create system configuration
  await prisma.systemConfig.upsert({
    where: { key: 'site_name' },
    update: {},
    create: {
      key: 'site_name',
      value: 'Workshop: Promova-se em 6 Meses'
    }
  });

  await prisma.systemConfig.upsert({
    where: { key: 'workshop_date' },
    update: {},
    create: {
      key: 'workshop_date',
      value: '2024-07-29T19:00:00Z'
    }
  });

  await prisma.systemConfig.upsert({
    where: { key: 'workshop_price' },
    update: {},
    create: {
      key: 'workshop_price',
      value: '29.90'
    }
  });

  await prisma.systemConfig.upsert({
    where: { key: 'workshop_original_price' },
    update: {},
    create: {
      key: 'workshop_original_price',
      value: '97.00'
    }
  });

  console.log('✅ Created system configuration');

  console.log('🎉 Database seeding completed successfully!');
  
  console.log('\n📊 Seeding Summary:');
  console.log(`- Admin user: admin@promovase.com (password: admin123)`);
  console.log(`- Test user: john@doe.com (password: johndoe123)`);
  console.log(`- Email providers: ${3} configured`);
  console.log(`- Sample leads: ${sampleLeads.length} created`);
  console.log(`- System configs: ${4} created`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
