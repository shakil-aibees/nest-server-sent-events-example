import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventsService } from './events.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EventsService],
})
export class AppModule { }
