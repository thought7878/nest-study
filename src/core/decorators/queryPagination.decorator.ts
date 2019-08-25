import { createParamDecorator } from '@nestjs/common';

export const QueryPagination = createParamDecorator((data, req) => {
  let { page, limit } = req.query;
  if (!page) {
    page = (data && data.page) || 1;
  }
  if (!limit) {
    limit = (data && data.limit) || 10;
  }
  return { page, limit };
});
