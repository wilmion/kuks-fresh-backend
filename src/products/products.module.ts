import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JWTStrategy } from '@core/strategies/jwt.strategy';

import { ProductsController } from './controllers/products.controller';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, JWTStrategy],
  exports: [ProductsService],
})
export class ProductsModule {}
