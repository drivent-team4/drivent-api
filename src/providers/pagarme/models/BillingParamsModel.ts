type BillingParamsModel =
  | {
      billing: {
        name: string;
        address: {
          country: string;
          state: string;
          city: string;
          neighborhood: string;
          street: string;
          street_number: string;
          zipcode: string;
        };
      };
    }
  | Record<string, never>;

export { BillingParamsModel };
