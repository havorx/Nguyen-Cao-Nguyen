import { singleton } from 'tsyringe';
import { HousesRepository } from '../../repositories/houses.repository';
import {
  CreateHousePayload,
  GetHousesQuery,
  UpdateHousePayload,
} from '../../schemas/houseSchemas';

@singleton()
export class HousesService {
  constructor(private housesRepository: HousesRepository) {}

  public async getHouses(payload: GetHousesQuery) {
    const result = await this.housesRepository.findAllHouses(payload);
    return {
      data: result,
      page: payload.page,
      totalRecord: result.length,
    };
  }

  public async getHouse(houseId: string) {
    return await this.housesRepository.getHouse(houseId);
  }

  public async createHouses(payload: CreateHousePayload) {
    return await this.housesRepository.createHouse(payload);
  }

  public async updateHouse(houseId: string, payload: UpdateHousePayload) {
    return await this.housesRepository.updateHouse(houseId, payload);
  }

  public async deleteHouse(houseId: string) {
    return await this.housesRepository.deleteHouse(houseId);
  }
}
