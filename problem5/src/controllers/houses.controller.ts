import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { logger } from '../logger';
import {
  CreateHousePayload,
  GetHousesQuery,
  HouseParams,
  UpdateHousePayload,
} from '../schemas/houseSchemas';
import { HousesService } from '../services/houses/houses.service';
import { errorHelper } from '../utils';

@singleton()
export class HousesController {
  constructor(private housesService: HousesService) { }

  public async getHouses(
    req: Request<object, object, object, GetHousesQuery>,
    res: Response,
  ) {
    try {
      const result = await this.housesService.getHouses(req.query);
      return res.send(result);
    } catch (error) {
      return errorHelper(error, res, 'Fail to get houses');
    }
  }

  public async getHouse(
    req: Request<HouseParams, object, object, object>,
    res: Response,
  ) {
    try {
      const result = await this.housesService.getHouse(req.params.houseId);
      return res.send({ data: result });
    } catch (error) {
      return errorHelper(error, res, 'Fail to get house');
    }
  }

  public async createHouse(
    req: Request<object, object, CreateHousePayload, object>,
    res: Response,
  ) {
    try {
      await this.housesService.createHouses(req.body);
      return res.send({ message: 'A new house is created' });
    } catch (error) {
      return errorHelper(error, res, 'Fail to create house');
    }
  }

  public async updateHouse(
    req: Request<HouseParams, object, UpdateHousePayload, object>,
    res: Response,
  ) {
    try {
      await this.housesService.updateHouse(req.params.houseId, req.body);
      return res.send({ message: 'House is updated' });
    } catch (error) {
      return errorHelper(error, res, 'Fail to update house');
    }
  }

  public async deleteHouse(
    req: Request<HouseParams, object, object, object>,
    res: Response,
  ) {
    try {
      await this.housesService.deleteHouse(req.params.houseId);
      return res.send({ message: 'House is deleted' });
    } catch (error) {
      return errorHelper(error, res, 'Fail to delete house');
    }
  }
}
