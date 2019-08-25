import { createParamDecorator } from '@nestjs/common';

export const QueryPagination = createParamDecorator((data, req) => {
  let { page, limit } = req.query;
  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 10;
  }
  return { page, limit };
});
