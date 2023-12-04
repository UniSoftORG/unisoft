export interface IUserData {
  id: string;
  avatar?: string;
  username: string;
  title: string;
  is_client?: boolean;
  color?: string;
  is_update?: boolean;
  friend_requests?: number;
  notifications?: number;
  whisper_block?: boolean;
  friends?: boolean | string | null;
  friends_count?: number;
  mutual_count?: number;
  signature?: string;
  status?: string;
  shouldRefresh?: boolean;
}
