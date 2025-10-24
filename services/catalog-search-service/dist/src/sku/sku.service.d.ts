import { PrismaService } from '../prisma/prisma.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
export declare class SkuService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSkuDto: CreateSkuDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }>;
    findBySku(sku: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }>;
    findByBarcode(barcode: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }>;
    searchByName(searchTerm: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }[]>;
    findAvailableStock(warehouseId?: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }[]>;
    update(id: number, updateSkuDto: UpdateSkuDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }>;
    remove(id: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        productId: string;
        code: string;
        barcode: string | null;
    }>;
}
