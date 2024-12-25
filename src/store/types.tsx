export enum CategoryType {
  ClassicNovel = '고전소설',
  Fantasy = '판타지',
  Romance = '로맨스',
  FairyTale = '동화',
  Mystery = '미스터리'
}

export enum DisplayType {
  View = 'vies',
  Like = 'like',
  Comment = 'comment',
  Bookmark = 'bookmark'
}

export enum SortFieldType {
  Id = 'ID',
  NickName = 'NICKNAME',
  Email = 'EMAIL',
  CreatedAt = 'CREATED_AT',
}

export enum SortDirectionType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum RoleType {
  Member = 'MEMBER',
  Admin = 'ADMIN',
  PendingAdmin ='PENDING_ADMIN'
}

export enum BookDetailTabType {
  Episodes = 'episodes',
  Comments = 'comments',
}

export enum AuthType {
  Login = 'login',
  Register = 'register',
}

export enum AgeGroupType {
  Teens = 'TEENS',
  Twenties = 'TWENTIES',
  Thirties = 'THIRTIES',
  Forties = 'FORTIES',
  Fifties = 'FIFTIES',
  Sixties = 'SIXTIES',
  Seventies = 'SEVENTIES',
  Eighties = 'EIGHTIES',
  Nineties = 'NINETIES',
}

export enum NotificationTargetType {
  All = 'ALL',
  Specific = 'SPECIFIC',
}

export enum TTSUploadStatusType {
  Pending = 'PENDING',
  Progress = 'STARTING',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
}