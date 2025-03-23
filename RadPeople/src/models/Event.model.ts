export interface WistiaItem {
  duration: number;
  hashed_id: string;
  id: number;
  thumbnail: {
    height: number;
    width: number;
    url: string;
  };
}

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
    alternateDescription: string;
    time: string;
    thumbnailImage: Array<{
      fields: {
        file: {
          url: string;
        };
      };
    }>;
    wistiaVideo: {
      items: WistiaItem[];
    };
    isVideo: boolean;
  };
  contentTypeId: string;
}