// import pagarme from 'pagarme';
import { processArgs } from './models';
import { billingParams, customerParams, itemParams, metadataParams } from './params';

class PagarMeProvider {
  async process({
    transactionCode,
    paymentType,
    total,
    installments,
    creditCard,
    customer,
    billing,
    items,
  }: processArgs) {
    const billetParams: {
      payment_mathod: string;
      amount: number;
      installments: number;
    } = {
      payment_mathod: 'boleto',
      amount: total * 100,
      installments: 1,
    };

    const creditCardParams = {
      payment_mathod: 'credit_card',
      amount: total * 100,
      installments,
      card_number: creditCard.number.replace(/[^?0-9]/g, ''),
      card_expiration_date: creditCard.expiration.replace(/[^?0-9]/g, ''),
      card_cvv: creditCard.cvv,
      capture: true,
    };

    let paymentParams;

    switch (paymentType) {
      case 'billet':
        paymentParams = billetParams;
        break;
      case 'credit_card':
        paymentParams = creditCardParams;
        break;
      default:
        throw 'Payment type not found';
    }

    console.log(paymentParams);

    const transactionsParams = {
      async: false,
      postback_url: '',
      ...paymentParams,
      ...customerParams(customer),
      ...billingParams(billing),
      ...itemParams(items, total),
      ...metadataParams(transactionCode),
    };

    console.log(transactionsParams);

    /* 
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    const response = await client.transactions.create(transactionsParams);

    console.debug('response', response);
    */
  }
}

export default PagarMeProvider;
