import { Injectable, OnApplicationBootstrap} from '@nestjs/common';
import { KnexService} from "./database/Knex.service";

@Injectable()
export class AppService implements OnApplicationBootstrap{
    constructor(private knexService: KnexService) {}

    async testTest() {
        return this.knexService.db('test').where('id', 1).first();
        // const knex = this.knexService.db;
        // return knex('test').where('id', 1).first();
    }

    async onApplicationBootstrap() {
        let asdf = await this.testTest();
        console.log(asdf);
    }
}
