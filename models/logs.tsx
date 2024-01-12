export interface queryLogsModel {
  page: number;
  query: string;
  userId: string;
  userGroupId: string;
  menuId: string;
  eventType: string;
  startDate: string | null;
  endDate: string | null;
}

export interface logsModel {
  name: string;
  group: string;
  position: string;
  status: number | null;
  menu: string;
  event: string;
  date: string;
  description: string;
}
