"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SkuService = class SkuService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSkuDto) {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`SKU with ID ${id} not found`);
        }
        return sku;
    }
    async findBySku(sku) {
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
            throw new common_1.NotFoundException(`SKU ${sku} not found`);
        }
        return skuData;
    }
    async findByBarcode(barcode) {
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
            throw new common_1.NotFoundException(`SKU with barcode ${barcode} not found`);
        }
        return sku;
    }
    async searchByName(searchTerm) {
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
    async findAvailableStock(warehouseId) {
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
    async update(id, updateSkuDto) {
        await this.findOne(id);
        return this.prisma.sku.update({
            where: { id },
            data: updateSkuDto,
            include: {
                product: true,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.sku.update({
            where: { id },
            data: { active: false },
        });
    }
};
exports.SkuService = SkuService;
exports.SkuService = SkuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SkuService);
//# sourceMappingURL=sku.service.js.map