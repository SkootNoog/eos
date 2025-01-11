import {Inject, Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {KnexService} from "./database/Knex.service";
import {User, UserModel} from "./database/model/user.model";
import {Entity, EntityModel} from "./database/model/entity.model";

@Injectable()
export class AppService implements OnApplicationBootstrap{
    constructor(
        private knexService: KnexService,
        @Inject(User) private user: UserModel,
        @Inject(Entity) private entity: EntityModel,
    ) {

    }

    async onApplicationBootstrap() {

        // let knex = this.knexService.db;

        let test_user_query = await this.user.query().select("*");
        console.log(test_user_query);

        let entity = await this.entity.query().findById(1);

        if (process.env.NODE_ENV === 'production') {
            return;
        }

        // await this.createSeedData(knex);
    }
}
