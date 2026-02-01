export type tSchoolLicense = {
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
    head: {
      post: string;
      name: string;
    };
    region: {
      name: string;
      code: number;
    };
  };
  supplements: Array<{
    uuid: string;
    number: string;
    is_for_branch: boolean;
    form_number: string | null;
    serial_number: string | null;
    note: string | null;
    status: {
      name: string;
      code: string | null;
    };
    educational_programs: Array<{
      uuid: string;
      edu_level: {
        name: string;
        short_name: string | null;
      };
    }>;
  }>;
};

export type tContextResponse = {
  pages_count: number;
  page: number;
  total_count: number;
  list: tSchoolLicense[];
};

export type tApiSchoolsResponse = {
  status: boolean;
  message: string;
  data: {
    pages_count: number;
    page: number;
    total_count: number;
    list: tSchoolLicense[];
  };
};
