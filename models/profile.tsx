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
  id: number | null;
  name: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface roleGroupModel {
  id: number | null;
  name: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  roles: roleModel[] | null;
}

export interface roleModel {
  id: number | null;
  name: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface fileModel {
  id: number | null;
  url: string | null;
  userId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

