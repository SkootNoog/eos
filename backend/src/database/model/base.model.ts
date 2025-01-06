import { Model, ModelOptions, QueryContext } from 'objection';

export class BaseModel extends Model {
    id!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date;

    override $beforeUpdate(
        options: ModelOptions,
        ctx: QueryContext,
    ): void | Promise<any> {
        this.updatedAt = new Date();
        super.$beforeUpdate(options, ctx);
    }
}