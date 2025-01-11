import { parse } from 'path';

export class WebpackMigrationSource {
    constructor(private migrationContext) {
        this.migrationContext = migrationContext;
    }

    getMigrations() {
        return Promise.resolve(
            this.migrationContext.keys().sort((a, b) => a.localeCompare(b)),
        );
    }

    getMigrationName(migration) {
        return parse(migration).base;
    }

    getMigration(migration) {
        return this.migrationContext(migration);
    }
}
