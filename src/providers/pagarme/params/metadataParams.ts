import { MetadataParamsModel, processArgs } from '../models';

function metadataParams(transactionCode: processArgs['transactionCode']) {
  const params: MetadataParamsModel = {
    metadata: {
      transaction_code: transactionCode,
    },
  };

  return params;
}

export { metadataParams };
