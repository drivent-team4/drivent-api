import { ItemParamsModel, processArgs } from '../models';

function itemParams(items: processArgs['items'], total: processArgs['total']) {
  const params: ItemParamsModel =
    items && items.length > 0
      ? {
          items: items.map((item) => ({
            id: item?.id.toString(),
            title: item?.title,
            unit_price: item?.amount * 100,
            quantity: item?.quantity || 1,
            tangible: false,
          })),
        }
      : {
          items: [
            {
              id: '1',
              title: 'title',
              unit_price: total,
              quantity: 1,
              tangible: false,
            },
          ],
        };

  return params;
}

export { itemParams };
