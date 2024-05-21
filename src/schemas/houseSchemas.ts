import * as yup from 'yup';
import { ComparisonType, SortOrder } from '../constants';

export const getHousesQuerySchema = yup.object({
  address: yup.string().trim().optional(),
  residents: yup.number().optional(),
  comparisonType: yup
    .string()
    .trim()
    .oneOf(Object.values(ComparisonType))
    .when('residents', {
      is: (residents: number) => typeof residents === 'number',
      then: (schema) => schema.required(),
    }),

  limit: yup.number().default(100),
  page: yup.number().default(1),
  sortOrder: yup
    .string()
    .uppercase()
    .trim()
    .oneOf(Object.values(SortOrder))
    .default(SortOrder.DESC),
});

export type GetHousesQuery = yup.InferType<typeof getHousesQuerySchema>;

export const createHousePayloadSchema = yup.object({
  address: yup.string().trim().required(),
  residents: yup.number().required(),
});

export type CreateHousePayload = yup.InferType<typeof createHousePayloadSchema>;

export const updateHousePayloadSchema = yup
  .object({
    address: yup.string().trim(),
    residents: yup.number(),
  })
  .test({
    test: (object) => Object.keys(object).length > 0,
    message: 'Payload must not be empty',
  });

export type UpdateHousePayload = yup.InferType<typeof updateHousePayloadSchema>;

export const houseParamsSchema = yup
  .object({
    houseId: yup.string().uuid().trim().required(),
  })
  .required();

export type HouseParams = yup.InferType<typeof houseParamsSchema>;
