export interface profileModel {
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  nickname: string | null;
  imageProfile: string | null;
  tel: string | null;
  positionId: number | null;
  roleGroupId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  resignedAt: string | null;
  position: positionModel | null;
  roleGroup: roleGroupModel | null;
  userFiles: fileModel[] | null;
}

export interface positionModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface roleGroupModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  roles: roleModel[];
}

export interface roleModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface fileModel {
  id: number;
  url: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
