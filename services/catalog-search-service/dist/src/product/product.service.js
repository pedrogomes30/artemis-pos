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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        return this.prisma.product.create({
            data: createProductDto,
            include: {
                category: true,
            },
        });
    }
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
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
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.update({
            where: { id },
            data: { active: false },
        });
    }
    async searchByName(searchTerm) {
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
    async findByCategory(categoryId) {
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
    async findLowStock(threshold = 10) {
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
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map