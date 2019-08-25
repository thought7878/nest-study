import { createParamDecorator } from '@nestjs/common';

export const QueryOrder = createParamDecorator((data, req) => {
  let { orderProperty, orderValue } = req.query;
  if (!orderProperty) {
    orderProperty = (data && data.orderProperty) || 'id';
  }
  if (!orderValue) {
    orderValue = (data && data.orderValue.toUpperCase()) || 'DESC';
  }
  return { orderProperty, orderValue };
});
