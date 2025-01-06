import {Inject, Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {KnexService} from "./database/Knex.service";
import {seedPlayer, seedUsers} from "./database/seed/1-user";
import {seedAdventurers, seedEntityType, seedMonsters} from "./database/seed/2-entity";
import {User, UserModel} from "./database/model/user.model";

@Injectable()
export class AppService implements OnApplicationBootstrap{
    constructor(
        private knexService: KnexService,
        @Inject(User) private user: UserModel,
    ) {

    }

    async onApplicationBootstrap() {

        // let knex = this.knexService.db;

        let test_user_query = await this.user.query().select("*");
        console.log(test_user_query);

        if (process.env.NODE_ENV === 'production') {
            return;
        }

        // await this.createSeedData(knex);
    }

    // async createSeedData(knex: any): Promise<void> {
    //     await seedUsers(knex);
    //     await seedPlayer(knex);
    //
    //     await seedEntityType(knex);
    //     await seedAdventurers(knex);
    //     await seedMonsters(knex);
    // }
}
