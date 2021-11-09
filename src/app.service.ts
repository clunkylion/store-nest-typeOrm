import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clientePg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Hello World! ${apiKey} ${name}`;
  }
  getTasks(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clientePg.query('select * from tasks', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }
}
