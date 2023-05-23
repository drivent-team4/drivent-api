import { CustomerParamsModel, processArgs } from '../models';

function customerParams(customer: processArgs['customer']) {
  const params: CustomerParamsModel = {
    customer: {
      external_id: customer.email,
      name: customer.name,
      email: customer.email,
      type: 'individual',
      country: 'br',
      phone_numbers: [customer.mobile],
      documents: [
        {
          type: customer.cpf,
          number: customer.document.replace(/[^?0-9]/g, ''),
        },
      ],
    },
  };

  return params;
}

export { customerParams };
