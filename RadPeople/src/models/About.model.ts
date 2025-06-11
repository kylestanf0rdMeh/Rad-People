export interface AboutItem {
    sys: {
      id: string;
      contentType: {
        sys: { id: string };
      };
    };
    fields: {
      aboutUs: string;
    };
    contentTypeId: string;
  }