import { createParamDecorator } from '@nestjs/common';

export const QueryList = createParamDecorator((data, req) => {
  let queryValues = req.query[data];
  if (queryValues) {
    queryValues = queryValues.split('-');
  }
  return queryValues;
});
