type ItemParamsModel =
  | {
      items: {
        id: string;
        title: string;
        unit_price: number;
        quantity: number;
        tangible: boolean;
      }[];
    }
  | {
      items: {
        id: string;
        title: string;
        unit_price: number;
        quantity: number;
        tangible: boolean;
      }[];
    };

export { ItemParamsModel };
