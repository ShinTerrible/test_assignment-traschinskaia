export type iSchoolLicense = {
  uuid: string;
  reg_number: string | null;
  issue_date: string;
  end_date: string;
  regulatory: string;
  edu_org: {
    full_name: string;
    short_name: string;
    contact_info: {
      post_address: string;
      phone: string;
      email: string;
    };
    region: {
      name: string;
      code: number;
    };
  };
  supplements: Array<{
    educational_programs: Array<{
      edu_level: {
        name: string;
        short_name: string | null;
      };
    }>;
  }>;
};

export type iApiSchoolsResponse = {
  status: boolean;
  message: string;
  data: {
    pages_count: number;
    page: number;
    total_count: number;
    list: iSchoolLicense[];
  };
};
