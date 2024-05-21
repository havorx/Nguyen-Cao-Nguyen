import { FindOptions, Op, WhereOptions, literal } from 'sequelize';
import { singleton } from 'tsyringe';
import { ComparisonType, HttpStatus } from '../constants';
import { Houses } from '../models/Houses';
import {
  CreateHousePayload,
  GetHousesQuery,
  UpdateHousePayload,
} from '../schemas/houseSchemas';

@singleton()
export class HousesRepository {
  public async findAllHouses(filters: GetHousesQuery) {
    const { limit, page, address, residents, comparisonType, sortOrder } =
      filters;
    const offset = (page - 1) * limit;

    const conditions: WhereOptions<Houses> = {};

    if (address) {
      conditions.address = { [Op.iLike]: `%${address}%` };
    }

    if (residents) {
      switch (comparisonType) {
        case ComparisonType.LESS_THAN:
          conditions.residents = { [Op.lt]: residents };
          break;
        case ComparisonType.LESS_OR_EQUAL:
          conditions.residents = { [Op.lte]: residents };
          break;
        case ComparisonType.GREATER_THAN:
          conditions.residents = { [Op.gt]: residents };
        case ComparisonType.GREATER_OR_EQUAL:
          conditions.residents = { [Op.gte]: residents };
        default:
          break;
      }
    }

    const opts: FindOptions = {
      where: conditions,
      limit,
      offset,
      order: [['updatedAt', sortOrder]],
    };

    return await Houses.findAll(opts);
  }

  public async getHouse(houseId: string) {
    const house = await Houses.findByPk(houseId);
    if (!house) {
      throw {
        message: 'House is not found',
        errorType: HttpStatus.errorType.NOT_FOUND,
      };
    }

    return house;
  }

  public async createHouse(payload: CreateHousePayload) {
    const house = await Houses.findOne({
      where: {
        address: payload.address,
      },
    });

    if (house) {
      throw {
        message: 'House address already existed',
        errorType: HttpStatus.errorType.NOT_FOUND,
      };
    }

    return await Houses.create(payload);
  }

  public async updateHouse(houseId: string, payload: UpdateHousePayload) {
    const house = await Houses.findByPk(houseId);
    if (!house) {
      throw {
        message: 'House is not found',
        errorType: HttpStatus.errorType.NOT_FOUND,
      };
    }

    return await Houses.update(payload, { where: { id: houseId } });
  }

  public async deleteHouse(houseId: string) {
    const house = await Houses.findByPk(houseId);
    if (!house) {
      throw {
        message: 'House is not found',
        errorType: HttpStatus.errorType.NOT_FOUND,
      };
    }

    return await Houses.update(
      {
        isDeleted: true,
        deletedAt: literal('CURRENT_TIMESTAMP'),
      },
      {
        where: {
          id: houseId,
        },
      },
    );
  }
}
