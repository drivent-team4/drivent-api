type CustomerParamsModel = {
  customer: {
    external_id: string;
    name: string;
    email: string;
    type: string;
    country: string;
    phone_numbers: string[];
    documents: [
      {
        type: string;
        number: string;
      },
    ];
  };
};

export { CustomerParamsModel };
