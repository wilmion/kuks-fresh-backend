import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { Response } from 'express';
import { Role } from '@core/decorators/roles.decorator';
import { Public } from '@core/decorators/public.decorator';

//Guards
import { JwtGuard } from '@core/guards/jwt.guard';
import { RolesGuard } from '@core/guards/roles.guard';

import { setResponse } from '@core/response';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';

import { RoleE } from '@core/enums/role.enum';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtGuard, RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get('')
  @ApiResponse({
    status: 200,
    description: 'CreateProductDto[]',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getProducts(@Res() res: Response) {
    try {
      const data = await this.productsService.getAll();
      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }

  @Public()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'CreateProductDto',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productsService.getProduct(id);
      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 404, 'Not found product');
    }
  }

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Post('')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Product Saved',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() payload: CreateProductDto, @Res() res: Response) {
    try {
      const data: string = await this.productsService.create(payload);

      setResponse(res, data, 201);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Patch('/:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Changes completed',
  })
  @ApiResponse({
    status: 500,
    description: 'You Id is not in any product or field invalid',
  })
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

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Delete('/:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product removed. ID: [id]',
  })
  @ApiResponse({
    status: 500,
    description: 'Your id is invalid',
  })
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.productsService.delete(id);

      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 404, 'Your id is invalid');
    }
  }
}
