import { BillingParamsModel, processArgs } from '../models';

function billingParams(billing: processArgs['billing']) {
  const params: BillingParamsModel = billing?.zipcode
    ? {
        billing: {
          name: 'Billing Address',
          address: {
            country: 'br',
            state: billing.state,
            city: billing.city,
            neighborhood: billing.neighborhood,
            street: billing.street,
            street_number: billing.number,
            zipcode: billing.zipcode,
          },
        },
      }
    : {};

  return params;
}

export { billingParams };
