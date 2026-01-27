import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './item.dto';

@Controller('item')
export class ItemController {
  /** Define your endpoints here */
  constructor(private itemService: ItemService) {}

  @Get()
  public getItems() {
    return this.itemService.getItems();
  }

  @Post()
  public postItem(@Body() item: ItemDto) {
    return this.itemService.postItem(item);
  }

  @Get(':id')
  public async getItemById(@Param('id') id: number) {
    return this.itemService.getItemById(id);
  }

  @Put(':id')
  public async putItemById(
    @Param('id') id: number,
    @Query() query: { property_name?: string; property_value?: string },
  ) {
    const propertyName = query.property_name ?? '';
    const propertyValue = query.property_value ?? '';
    return this.itemService.putItemById(id, propertyName, propertyValue);
  }

  @Delete(':id')
  public async deleteItemById(@Param('id') id: number) {
    return this.itemService.deleteItemById(id);
  }
}
