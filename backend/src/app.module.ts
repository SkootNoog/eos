import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from "./database/Database.module";
import { EntityModule } from './entity/entity.module';

@Module({
    imports: [DatabaseModule, EntityModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
