export interface ClientItem {
    sys: {
      id: string;
      contentType: {
        sys: {
          id: string;
        };
      };
    };
    fields: {
      clientName: string;
      description: string;
      yearStarted: number;
      isCompleted: boolean;
      companyType: string;
    };
    contentTypeId: string;
  }