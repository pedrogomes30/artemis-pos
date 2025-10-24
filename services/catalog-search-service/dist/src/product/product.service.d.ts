import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }>;
    remove(id: number): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }>;
    searchByName(searchTerm: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }[]>;
    findByCategory(categoryId: number): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }[]>;
    findLowStock(threshold?: number): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: string;
        syncJobId: string | null;
    }[]>;
}
