import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/common';
import { last } from 'rxjs';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  onModuleInit() {
    this.$connect();
    console.log('Connected to database');
  }

  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true,
        },
      }),
      meta: {
        total: totalPages,
        lastPage,
        page,
      }
    }
  }

  async findOne(id: number) {

    const product = await this.product.findFirst({
      where: {
        id,
        available: true,
      }
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;

  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data
    });


  }

  async remove(id: number) {

    await this.findOne(id);

    return this.update(id, { id, available: false });

    // return this.product.delete({
    //   where: { id },
    // });
  }
}
