export interface ProductItem {
  sys: {
      id: string;
      contentType: {
        sys: {
          id: string;
        };
      };
  };
  fields: {
      name: string;
      description: string;
      image: Array<{
        fields: {
          file: {
            url: string;
          };
          title: string;
        };
      }>;
      altImages: Array<{
        fields: {
          file: {
            url: string;
          };
          title: string;
        };
      }>;
      sizes: string;
      price: number;
      color: string;
      shipingInWeeks: string;
      sizeAndFit: string;
      care: string;
  };
  contentTypeId: string;
}