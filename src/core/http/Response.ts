import { Injectable } from "../container/Injectable.js";
import {type Response as ExpressResponse} from 'express';

export class Response extends Injectable {
  constructor(protected readonly _baseResponse: ExpressResponse) {
    super();
  }
}
