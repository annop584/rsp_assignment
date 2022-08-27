import {
  ArgumentMetadata,
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  Injectable,
  Param,
  Patch,
  PipeTransform,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RspService } from './rsp.service';

@Controller('rsp')
export class RspController {
  constructor(
    private readonly rspService: RspService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('botrandomrsp')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async createRestaurant(@Req() req: Request) {
    return this.rspService.getRandom_rsp();
  }

  @Get('updatescore')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async sendrsp(@Req() req: Request) {
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const jwtdecode = this.jwtService.decode(jwt, { json: true });

    return this.rspService.save_rsp_stat(jwtdecode['email']);
    // return jwtdecode['email'];
  }

  @Get('gethighscore')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async getHighscore() {
    return this.rspService.gethighscore();
  }

  @Get('getscores')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async getScores(@Req() req: Request) {
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const jwtdecode = this.jwtService.decode(jwt, { json: true });
    return this.rspService.getScores(jwtdecode['email']);
  }
}
