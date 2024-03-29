import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import {ElasticsearchService} from '@nestjs/elasticsearch'

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticsearchService: ElasticsearchService,

  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // 엘라스틱 서치에서 조회 연습하기!!
    const result = await this.elasticsearchService.search({
      index:'myproduct ',
      query: {
        match_all: {},
      }
    })
    console.log(JSON.stringify(result, null,'  '))
    // 엘라스틱서치에서 조회해보기 위해 임시 주석
    // return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // 엘라스틱서치에서 등록 연습하기!! => 연습, 실제론 mysql에 저장할 예정
    // this.elasticsearchService.create({
    //   id:'myid',
    //   index: 'myproduct',
    //   document:{
    //     name: "철수",
    //     age: 13,
    //     school:"다람쥐초등학교",
    //   }
    // })
    // 엘라스틱서치에서 테이블은 인덱스로 불림!
    //엘라스틱서치에서 등록해보기 위해 임시로 주석
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });

    // 수정하기
    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
