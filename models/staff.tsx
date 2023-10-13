export interface createStaffModel {
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  position: string;
  group: string;
  status: string;
  password: string;
}

export interface queryStaffModel {
  page: number;
  query: string;
  group: string;
  position: string;
  status: string;
}
