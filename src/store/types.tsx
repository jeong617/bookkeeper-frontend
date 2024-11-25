export enum CategoryType {
  ClassicNovel = "고전소설",
  Fantasy = "판타지",
  Romance = "로맨스",
  FairyTale = "동화",
  Mystery = "미스터리"
}

export enum DisplayType {
  View = "vies",
  Like = "like",
  Comment = "comment",
  Bookmark = "bookmark"
}

export enum RoleType {
  Members = "members",
  Admins = "admins",
}

export enum BookDetailTabType {
  Episodes = "episodes",
  Comments = "comments",
}

/* SORT OPTIONS */
export enum SortField {
  id = "id",
  nickname = "nickname",
  email = "email",
  createdAt = "createdAt",
}

export enum SortDirection {
  asc = "asc",
  desc = "desc",
}
