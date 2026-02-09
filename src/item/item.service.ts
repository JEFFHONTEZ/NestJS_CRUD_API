import { Injectable, HttpException } from '@nestjs/common';
// import { ITEMS } from './items.mock';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/item.interface';
import { ItemDto } from './item.dto';

const itemProjection = {
  __v: false,
};

@Injectable()
export class ItemService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  public async getItems(): Promise<ItemDto[]> {
    const items = await this.itemModel.find({}, itemProjection).exec();
    if (!items || !items[0]) {
      throw new HttpException('No Items Found', 404);
    }
    return items;
  }

  public async postItem(newItem: ItemDto) {
    const item = await this.itemModel.create(newItem);
    return item.save();
  }

  public async getItemById(id: number): Promise<ItemDto> {
    const item = await this.itemModel.findOne({ id }, itemProjection).exec();
    if (!item) {
      throw new HttpException('Not Found', 404);
    }
    return item;
  }

  public async deleteItemById(id: number): Promise<ItemDto> {
    const item = await this.itemModel.findOneAndDelete({ id }).exec();
    if (!item) {
      throw new HttpException('Not Found', 404);
    }
    return item;
  }

  public async putItemById(
    id: number,
    updateData: Partial<ItemDto>, // Use Partial to allow any combination of Item properties
  ): Promise<ItemDto> {
    const item = await this.itemModel
      .findOneAndUpdate(
        { id },
        updateData, // TypeScript now knows this matches the Item structure
        { new: true, runValidators: true },
      )
      .exec();

    if (!item) {
      throw new HttpException('Not Found', 404);
    }
    return item;
  }

  //   private items = ITEMS;
  //   public getItems() {
  //      return this.items;
  //   }
  //   public postItem(item: any) {
  //     return this.items.push(item);
  //   }
  //   public getItemById(id: number): Promise<any> {
  //     const itemId = Number(id);
  //     return new Promise((resolve) => {
  //       const item = this.items.find((item) => item.id === itemId);
  //       if (!item) {
  //         throw new HttpException('Not Found', 404);
  //       }
  //       return resolve(item);
  //     });
  //   }
  //   public deleteItemById(id: number): Promise<any> {
  //     const itemId = Number(id);
  //     return new Promise((resolve) => {
  //       const index = this.items.findIndex((item) => item.id === itemId);
  //       if (index === -1) {
  //         throw new HttpException('Not Found', 404);
  //       }
  //       this.items.splice(index, 1);
  //       return resolve(this.items);
  //     });
  //   }
  //   public putItemById(
  //     id: number,
  //     propertyName: string,
  //     propertyValue: string,
  //   ): Promise<any> {
  //     const itemId = Number(id);
  //     return new Promise((resolve) => {
  //       const index = this.items.findIndex((item) => item.id === itemId);
  //       if (index === -1) {
  //         throw new HttpException('Not Found', 404);
  //       }
  //       this.items[index][propertyName] = propertyValue;
  //       return resolve(this.items[index]);
  //     });
  //   }
}
