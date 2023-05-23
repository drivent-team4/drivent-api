interface processArgs {
  customer: {
    name: string;
    email: string;
    document: string;
    cpf: string;
    mobile: string;
  };
  paymentType: string;
  total: number;
  transactionCode: number;
  installments: number;
  creditCard: {
    number: string;
    name: string;
    cvv: number;
    expiration: string;
    fleg: string;
  };
  billing: {
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    zipcode: string;
  };
  items: {
    id: number;
    title: string;
    amount: number;
    quantity: number;
  }[];
}

export { processArgs };
