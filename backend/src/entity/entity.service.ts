import {Inject, Injectable} from '@nestjs/common';
import {EntityModelType, EntityModel} from "@models";
import {Entity} from "@eos-classes/entity";

@Injectable()
export class EntityService {


    constructor(
        @Inject(EntityModel) private entity: EntityModelType,
    ) {

    }

    async getEntity(id: number) {
        return new Entity(await this.entity.query().findById(id));
    }

}
