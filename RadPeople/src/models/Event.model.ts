export interface EventItem {
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
      description?: string;
      musicInformation: string;
      location?: string;
      date: string;
      ticketCount: string;
      thumbnail: Array<{
        fields: {
          file: {
            url: string;
          };
        };
      }>;
      isVideo: boolean;
    };
    contentTypeId: string;
  }