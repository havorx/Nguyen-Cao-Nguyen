import { Router } from 'express';
import { singleton } from 'tsyringe';
import { HousesController } from '../controllers/houses.controller';
import { validate } from '../middleware/validate';
import {
  createHousePayloadSchema,
  getHousesQuerySchema,
  houseParamsSchema,
  updateHousePayloadSchema,
} from '../schemas/houseSchemas';

@singleton()
export class HousesRoutes {
  public housesRouter = Router();

  constructor(housesController: HousesController) {
    this.housesRouter.get(
      '/',
      validate('get', null, getHousesQuerySchema),
      housesController.getHouses.bind(housesController),
    );

    this.housesRouter.get(
      '/:houseId',
      validate('get', houseParamsSchema),
      housesController.getHouse.bind(housesController),
    );

    this.housesRouter.post(
      '/',
      validate('post', null, createHousePayloadSchema),
      housesController.createHouse.bind(housesController),
    );

    this.housesRouter.put(
      '/:houseId',
      validate('put', houseParamsSchema, updateHousePayloadSchema),
      housesController.updateHouse.bind(housesController),
    );

    this.housesRouter.delete(
      '/:houseId',
      validate('delete', houseParamsSchema),
      housesController.deleteHouse.bind(housesController),
    );
  }
}
