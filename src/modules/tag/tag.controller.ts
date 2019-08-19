import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { create } from 'domain';
import { TagDto } from './tag.dto';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() data: TagDto) {
    return await this.tagService.create(data);
  }
  @Get()
  async readAll() {
    return await this.tagService.readAll();
  }
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: TagDto) {
    return await this.tagService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.delete(id);
  }
}
