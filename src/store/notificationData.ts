export interface NotificationData {
  title: string;
  message: string;
  email?: string;
}

export interface ReqNovelData {
  "id": string,
  "novel": {
    "novelInfo": {
      "snapshotId": string
      "id": string,
      "title": string,
      "description": string,
      "ref": string,
      "createdAt": string
    },
    "novelStatus": {
      "id": string,
      "snapshotId": string,
      "reason": string,
      "status": string,
      "responsiblePerson": string,
      "responsiblePersonEmail": string,
      "createdAt": string
    },
    "createdAt": string
  },
  "requesters": [
    {
      "historyId": string,
      "requesterId": string,
      "sequence": number
    }
  ],
  "createdAt": string,
  "deletedAt": null
}