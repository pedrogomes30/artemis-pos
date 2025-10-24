import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    // CREATE com relacionamento
    async create(createProductDto: CreateProductDto) {
        return this.prisma.product.create({
            data: createProductDto,
            include: {
                category: true, // Inclui a categoria na resposta
            },
        });
    }

    // READ ALL com relacionamentos
    async findAll() {
        return this.prisma.product.findMany({
            where: { active: true },
            include: {
                category: true,
                skus: {
                    where: { active: true },
                    include: {
                        prices: {
                            where: { active: true },
                            include: {
                                priceList: true,
                            },
                        },
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
    }

    // READ ONE com todos os relacionamentos
    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                skus: {
                    include: {
                        prices: {
                            include: {
                                priceList: true,
                            },
                        },
                        stocks: {
                            include: {
                                warehouse: {
                                    include: {
                                        store: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }

    // UPDATE
    async update(id: number, updateProductDto: UpdateProductDto) {
        await this.findOne(id);

        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
            include: {
                category: true,
                skus: true,
            },
        });
    }

    // SOFT DELETE
    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.product.update({
            where: { id },
            data: { active: false },
        });
    }

    // FULL TEXT SEARCH (PostgreSQL)
    async searchByName(searchTerm: string) {
        return this.prisma.product.findMany({
            where: {
                AND: [
                    { active: true },
                    {
                        name: {
                            search: searchTerm,
                        },
                    },
                ],
            },
            include: {
                category: true,
                skus: {
                    where: { active: true },
                },
            },
        });
    }

    // Busca por categoria
    async findByCategory(categoryId: number) {
        return this.prisma.product.findMany({
            where: {
                categoryId,
                active: true,
            },
            include: {
                category: true,
                skus: true,
            },
        });
    }

    // Produtos com estoque baixo
    async findLowStock(threshold: number = 10) {
        return this.prisma.product.findMany({
            where: {
                active: true,
                skus: {
                    some: {
                        stocks: {
                            some: {
                                available: {
                                    lte: threshold,
                                },
                            },
                        },
                    },
                },
            },
            include: {
                skus: {
                    include: {
                        stocks: true,
                    },
                },
            },
        });
    }
}
