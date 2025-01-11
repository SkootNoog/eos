
import { Injectable, Logger } from '@nestjs/common';
import {Knex} from 'knex';
import { parse as parsePath, join } from 'path';
import { WebpackMigrationSource } from './webpack-migration-source';

@Injectable()
export class KnexMigratorService {
    private readonly logger = new Logger(this.constructor.name);

    // This returns files built by webpack for the migrations
    // We should just be able to grab the files directly from the migrations folder and return those file names
    //
    // private readonly migrationSource = new WebpackMigrationSource(
    //   /**
    //    * https://knexjs.org/guide/migrations.html#webpack-migration-source-example
    //    * https://webpack.js.org/guides/dependency-management/#requirecontext
    //    */
    //   (require as any).context('./migrations', false, /\.ts$/),
    // );

    private get migrationConfig() {
        return {
            stage: 'latest',
            config: {
                tableName: 'migrations',
                directory: join(__dirname, 'migrations'),
            } as Knex.MigratorConfig,
            // Webpack config below:
            // config: {
            //   tableName: 'migrations',
            //   directory: join(__dirname, 'migrations'),
            // } as Knex.MigratorConfig,
        };
    }

    private async applyMigrations(
        {
            conn,
            migrations,
            direction,
        }: {
            conn: Knex;
            migrations: { name: string }[];
            direction: 'forward' | 'rollback';
        }
    ) {
        const { config } = this.migrationConfig;

        for await (const { name } of migrations) {
            this.logger.warn(`Applying ${direction} migration ${name}`);
            if (direction === 'forward') {
                await conn.migrate.up({
                    ...config,
                    name,
                });
            } else if (direction === 'rollback') {
                await conn.migrate.down({
                    ...config,
                    name,
                });
            }
        }
    }

    private async ensureMigrationVersion(
        {
            conn,
            targetVersion,
            currentVersion,
            applied,
            available,
        }: {
            conn: Knex;
            targetVersion: string;
            currentVersion: string;
            applied: { name: string }[];
            available: { name: string }[];
        }
    ) {
        const isRollback = +targetVersion < +currentVersion;
        const targetMigration = (isRollback ? applied : available).findIndex(
            ({ name }) => {
                const path = name.split('/');
                return path[path.length - 1].startsWith(targetVersion);
            },
        );
        if (isRollback) {
            await this.applyMigrations({
                conn,
                migrations: applied.slice(targetMigration + 1).reverse(),
                direction: 'rollback',
            });
        } else {
            await this.applyMigrations({
                conn,
                migrations: available.slice(0, targetMigration + 1),
                direction: 'forward',
            });
        }
    }

    private async _runMigrations(conn: Knex) {
        const { stage, config } = this.migrationConfig;
        this.logger.debug(`Ensuring migrations up to ${stage} are applied`);

        await conn.migrate.forceFreeMigrationsLock(config);

        let [applied, available] = await conn.migrate.list(config);

        // Uncomment to rollback and apply all migrations every app-start
        for await (const _ of applied) {
            await conn.migrate.rollback(config);
        }

        [applied, available] = await conn.migrate.list(config);
        // End of rollback for every app-start

        const [targetVersion] = (
            stage === 'latest' ? available.at(-1).file : stage
        ).split('_');

        const currentVersion = await conn.migrate.currentVersion(config);
        if (targetVersion === currentVersion) {
            this.logger.log(
                `Migrations are up to date with version ${currentVersion}`,
            );
            return;
        }

        await this.ensureMigrationVersion({
            conn,
            currentVersion,
            targetVersion,
            applied,
            available: available.map((name) => ({
                name: name.file || parsePath(name).base,
            })),
        });
    }

    async runMigrations(conn: Knex) {
        await this._runMigrations(conn);
    }
}
