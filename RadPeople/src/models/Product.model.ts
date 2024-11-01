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
      price: number;
  };
  contentTypeId: string;
}