import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './item.dto';
import { UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

// Custom decorator for roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('item')
export class ItemController {
  /** Define your endpoints here */
  constructor(private itemService: ItemService) {}

  @Get()
  public getItems() {
    return this.itemService.getItems();
  }

  @UseGuards(JwtAuthGuard) /**Requires login */
  @Post()
  public postItem(@Body() item: ItemDto) {
    return this.itemService.postItem(item);
  }

  @Get(':id')
  public async getItemById(@Param('id') id: number) {
    return this.itemService.getItemById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  public async putItemById(
    @Param('id') id: number,
    @Body() updateItemDto: Partial<ItemDto>, // Type the body here as well
  ) {
    return this.itemService.putItemById(id, updateItemDto);
  }

  // @Put(':id')
  // public async putItemById(
  //   @Param('id') id: number,
  //   @Query() query: { property_name?: string; property_value?: string },
  // ) {
  //   const propertyName = query.property_name ?? '';
  //   const propertyValue = query.property_value ?? '';
  //   return this.itemService.putItemById(id, propertyName, propertyValue);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') /**Only Admin can delete */
  @Delete(':id')
  public async deleteItemById(@Param('id') id: number) {
    return this.itemService.deleteItemById(id);
  }
}
