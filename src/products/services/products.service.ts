import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async getAll() {
    const data = await this.productModel.find().exec();
    return data;
  }
  async getProduct(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new Error('');
    }

    return product;
  }
  async create(product: CreateProductDto) {
    const newProduct = new this.productModel(product);
    await newProduct.save();
    return 'Product Saved';
  }
  async update(id: string, changes: UpdateProductDto) {
    await this.productModel
      .findByIdAndUpdate(id, {
        $set: changes,
        new: true,
      })
      .exec();

    return 'Changes completed';
  }
  async delete(id: string) {
    await this.productModel.findByIdAndDelete(id);

    return 'Product removed. ID: ' + id;
  }
}
