import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AuthUser {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  get user(): any | null {
    return this.request.user;
  }
}
