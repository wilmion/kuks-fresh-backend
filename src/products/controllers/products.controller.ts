import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Response as Res,
} from '@nestjs/common';
import { Response } from 'express';

import { setResponse } from '@core/response';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  async getProducts(@Res() res: Response) {
    try {
      const data = await this.productsService.getAll();
      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productsService.getProduct(id);
      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 404, 'Not found product');
    }
  }

  @Post('')
  async create(@Body() payload: CreateProductDto, @Res() res: Response) {
    try {
      const data: string = await this.productsService.create(payload);

      setResponse(res, data, 201);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Patch('/:id')
  async update(
    @Body() payload: UpdateProductDto,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const data: string = await this.productsService.update(id, payload);

      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(
        res,
        null,
        404,
        `You Id is not in any product or field invalid`,
      );
    }
  }

  @Delete('/:id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.productsService.delete(id);

      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 404, 'Your id is invalid');
    }
  }
}