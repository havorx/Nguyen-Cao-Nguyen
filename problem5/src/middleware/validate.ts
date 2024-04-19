import { RequestHandler } from 'express';
import * as yup from 'yup';

export function validate(
  method: 'get' | 'post' | 'put' | 'delete',
  paramsSchema: yup.ObjectSchema<object, unknown, object> | null,
  schema?: yup.ObjectSchema<object, unknown, object> | null,
): RequestHandler<unknown, unknown, object, object> {
  return async (req, res, next) => {
    try {
      switch (method) {
        case 'get':
          if (paramsSchema) {
            await paramsSchema.validate(req.params);
            break;
          }

          if (schema) {
            if (Object.keys(req.query).length === 0) {
              req.query = schema.getDefault();
            }

            req.query = await schema.validate(req.query);
          }
          break;

        case 'post':
          if (schema) {
            req.body = await schema.validate(req.body);
          }
          break;

        case 'put':
          if (paramsSchema) {
            await paramsSchema.validate(req.params);
          }

          if (schema) {
            req.body = await schema.validate(req.body);
          }
          break;

        case 'delete':
          if (paramsSchema) {
            await paramsSchema.validate(req.params);
          }
          break;

        default:
          break;
      }
      return next();
    } catch (error) {
      return res.status(400).send({
        type: error.name,
        message: error.message,
      });
    }
  };
}
