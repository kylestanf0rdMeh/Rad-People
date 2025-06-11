export interface TalentItem {
  sys: {
    id: string;
    contentType: {
      sys: { id: string };
    };
  };
  fields: {
    firstName: string;
    lastName: string;
    profilePicture: {
      fields: {
        file: { url: string };
      };
    };
    bio: string;
    role: string;
  };
  contentTypeId: string;
}