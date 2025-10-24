import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    } | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    }>;
    remove(id: number): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    }>;
    delete(id: number): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    }>;
    search(query: string): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        status: string;
    }[]>;
    findPaginated(page?: number, limit?: number): Promise<{
        data: {
            name: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            password: string;
            status: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
