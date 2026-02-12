
export enum CodeStatus {
  AVAILABLE = 'available',
  LOCKED = 'locked',
  CLAIMED = 'claimed'
}

export interface InviteCode {
  id: string;
  code: string;
  note: string;
  status: CodeStatus;
  createdAt: number;
  updatedAt: number;
  addedBy: string;
}

export interface AppState {
  codes: InviteCode[];
}
