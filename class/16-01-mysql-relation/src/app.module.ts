import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({//dependency
  imports: [
     BoardModule,
      GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
         autoSchemaFile: 'src/common/graphql/schema.gql',
        }),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'myproject02',
        entities: [__dirname + '/apis/**/*.entity.*'],
        synchronize: true,
        logging: true,
        // retryAttempts:5,
        // retryDelay:1000
      }),
    ],
//   controllers: [AppController],
//   providers: [AppService],
    
    // app모듈에서도 사용
})
export class AppModule {}