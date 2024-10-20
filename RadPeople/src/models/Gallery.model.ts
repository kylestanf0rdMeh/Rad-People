export interface GalleryItem {
    sys: {
      id: string;
      contentType: {
        sys: {
          id: string;
        };
      };
    };
    fields: {
      descriptions?: string;
      image: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      location?: string;
    };
    contentTypeId: string;
  }