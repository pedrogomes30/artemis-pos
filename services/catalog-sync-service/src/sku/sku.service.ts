import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';

@Injectable()
export class SkuService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createSkuDto: CreateSkuDto) {
        return this.prisma.sku.create({
            data: createSkuDto,
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.sku.findMany({
            where: { active: true },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
                prices: {
                    where: { active: true },
                    include: {
                        priceList: true,
                    },
                },
                stocks: {
                    include: {
                        warehouse: true,
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        const sku = await this.prisma.sku.findUnique({
            where: { id },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
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
        });

        if (!sku) {
            throw new NotFoundException(`SKU with ID ${id} not found`);
        }

        return sku;
    }

    // Buscar por código SKU
    async findBySku(sku: string) {
        const skuData = await this.prisma.sku.findUnique({
            where: { sku },
            include: {
                product: true,
                prices: {
                    where: { active: true },
                    include: {
                        priceList: true,
                    },
                },
                stocks: true,
            },
        });

        if (!skuData) {
            throw new NotFoundException(`SKU ${sku} not found`);
        }

        return skuData;
    }

    // Buscar por código de barras
    async findByBarcode(barcode: string) {
        const sku = await this.prisma.sku.findUnique({
            where: { barcode },
            include: {
                product: true,
                prices: {
                    where: { active: true },
                },
                stocks: true,
            },
        });

        if (!sku) {
            throw new NotFoundException(`SKU with barcode ${barcode} not found`);
        }

        return sku;
    }

    // FULL TEXT SEARCH no nome do SKU
    async searchByName(searchTerm: string) {
        return this.prisma.sku.findMany({
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
                product: {
                    include: {
                        category: true,
                    },
                },
                prices: {
                    where: { active: true },
                },
            },
        });
    }

    // Buscar SKUs com estoque disponível
    async findAvailableStock(warehouseId?: number) {
        return this.prisma.sku.findMany({
            where: {
                active: true,
                stocks: {
                    some: {
                        available: {
                            gt: 0,
                        },
                        ...(warehouseId && { warehouseId }),
                    },
                },
            },
            include: {
                product: true,
                stocks: {
                    where: {
                        ...(warehouseId && { warehouseId }),
                    },
                    include: {
                        warehouse: true,
                    },
                },
            },
        });
    }

    async update(id: number, updateSkuDto: UpdateSkuDto) {
        await this.findOne(id);

        return this.prisma.sku.update({
            where: { id },
            data: updateSkuDto,
            include: {
                product: true,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.sku.update({
            where: { id },
            data: { active: false },
        });
    }
}
