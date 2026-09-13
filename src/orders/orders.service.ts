import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

type OrderItemInput = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  items: OrderItemInput[];
};

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateOrderInput) {
    try {
      const subtotal = input.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 10;
      const total = subtotal + shipping;

      return await this.prisma.order.create({
        data: {
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          items: input.items as any,
          subtotal,
          shipping,
          total,
          status: "pending",
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({ where: { id } });
  }
}
