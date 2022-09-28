import { Args, Context, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query()
  sayHello(): string {
    return 'Hello World!';
  }
}
