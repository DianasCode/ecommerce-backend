import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.product.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

