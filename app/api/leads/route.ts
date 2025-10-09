
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { emailService } from '@/lib/email/email-service';
import { leadCaptureSchema } from '@/lib/validations';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// POST - Create new lead
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = leadCaptureSchema.parse(body);

    // Check if lead already exists
    const existingLead = await prisma.lead.findUnique({
      where: { email: validatedData.email }
    });

    if (existingLead) {
      // Update existing lead
      const updatedLead = await prisma.lead.update({
        where: { email: validatedData.email },
        data: {
          name: validatedData.name || existingLead.name,
          phone: validatedData.phone || existingLead.phone,
          source: validatedData.source,
          utm_source: validatedData.utm_source || existingLead.utm_source,
          utm_medium: validatedData.utm_medium || existingLead.utm_medium,
          utm_campaign: validatedData.utm_campaign || existingLead.utm_campaign,
          updatedAt: new Date(),
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Lead atualizado com sucesso!',
        data: updatedLead
      });
    }

    // Create new lead
    const newLead = await prisma.lead.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        phone: validatedData.phone || null,
        source: validatedData.source,
        utm_source: validatedData.utm_source || null,
        utm_medium: validatedData.utm_medium || null,
        utm_campaign: validatedData.utm_campaign || null,
        status: 'ACTIVE',
      }
    });

    // Add to email service
    const emailResult = await emailService.addContact({
      email: validatedData.email,
      name: validatedData.name,
      phone: validatedData.phone,
      tags: [validatedData.source],
    }, validatedData.source);

    if (emailResult.success) {
      // Send welcome email
      await emailService.sendWelcomeEmail({
        email: validatedData.email,
        name: validatedData.name,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Lead capturado com sucesso! Verifique seu email.',
      data: newLead
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'Dados inválidos fornecidos',
        error: error.message
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// GET - List leads (admin only)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        message: 'Acesso negado'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || 'all';
    const source = searchParams.get('source') || 'all';
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (status !== 'all') {
      where.status = status;
    }
    
    if (source !== 'all') {
      where.source = source;
    }
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get leads with pagination
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.lead.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Leads fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar leads',
      error: 'Internal server error'
    }, { status: 500 });
  }
}
