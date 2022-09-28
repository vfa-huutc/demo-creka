import {
  Module,
  OnModuleInit,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlMiddleware } from './vendors/middlewares/graphql.middleware';
import dbConfig from './configs/db/msSql';
import { LoggerModule } from './common/logger/logger.module';
import { BaseException } from './vendors/exceptions/base.exception';
import { Logger } from './common/logger/logger';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { GraphQLError } from 'graphql';
import { UsersModule } from './app/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [
        path.join(__dirname, '/../', '**/vendors/schema/*.graphql'),
        path.join(__dirname, '/../', '**/modules/**/*.graphql'),
      ],
      path: '/graphql',
      debug: true,
      definitions: {
        path: path.join(process.cwd(), 'src/app/graphql/graphql.schema.ts'),
      },
      playground: true,
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      formatError: (error: GraphQLError): any => {
        new Logger().error(`GraphQLError: ${error.message}`);
        return error.message;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule, OnModuleInit {
  async onModuleInit() {
    await this.init();
  }
  async init() {
    process.on('unhandledRejection', (reason) => {
      throw new BaseException(
        'unhandledRejection',
        'Unhandled Rejection',
        reason,
      );
    });
    new Logger().log(`${AppModule.name} init`);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GraphqlMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
