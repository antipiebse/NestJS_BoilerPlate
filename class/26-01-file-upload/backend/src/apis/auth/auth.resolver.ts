import { AuthService } from './auth.service';
import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import {Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt'
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { GqlAuthRefreshGuard } from 'src/common/auth/gql-auth-guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ){}
  @Mutation(()=> String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any
    ){
    // 1. 로그인(이메일과 비밀번호가 일치하는 유저 찾기)
    const user = await this.userService.findOne({ email })

    // 2. 일치하는 유저가 없으면? 에러 던지기!
    if(!user) throw new UnprocessableEntityException('이메일이 존재하지 않습니다.')
    
    // 3. 일차하는 유저가 있지만, 암호가 틀렸다면 에러던지기!!
    const isAuth = await bcrypt.compare(password, user.password)
    if(!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.')
    
    // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    // res, req는 context에 저장되어있음
    this.authService.setRefreshToken({user, res: context.res})


    // 5. 일치하는 유저가 있으면? accessToken(JWT)을 만들어서 프론트엔드에 보내주기
    return this.authService.getAccessToken({user})
  }

  @UseGuards(GqlAuthRefreshGuard)//guard로 정상적인지 확인
  @Mutation(()=>String)
  restoreAccessToken(//새로 access토큰을 받는다.
    @CurrentUser() currentUser: ICurrentUser
  ){
    return this.authService.getAccessToken({ user:currentUser })
  }
}