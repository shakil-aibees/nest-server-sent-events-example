import { Controller, Get, Post, Request, Res, Sse } from '@nestjs/common';
import { EventsService } from "./events.service";
import { readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {

  constructor(private readonly eventsService: EventsService) {
  }

  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Sse('events')
  events(
    @Request() req,
  ) {
    return this.eventsService.subscribe(req.params.id);
  }

  @Post('emit')
  async emit(@Request() req) {
    this.eventsService.emit(req.param.id, { emitting: new Date().toISOString() });
    return { ok: true };
  }

}