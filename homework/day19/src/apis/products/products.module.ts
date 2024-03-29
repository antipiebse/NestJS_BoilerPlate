import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductDetail } from '../productDetail/entities/productDetail.entity';
import { ProductTag } from '../productsTag/entities/productTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product,
    ProductDetail,
    ProductTag
  ])],


  providers: [ProductsResolver, ProductsService]
})
export class ProductModule{}
