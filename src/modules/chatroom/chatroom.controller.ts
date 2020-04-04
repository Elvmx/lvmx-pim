import { Controller, Get, Render } from '@nestjs/common';

@Controller('chatroom')
export class ChatroomController {
  @Get()
  @Render('chatroom')
  async index() {}
}
