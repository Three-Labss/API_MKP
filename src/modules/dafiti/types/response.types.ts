export type RequestResponse = {
  token: string;
  id?: number;
  limit?: string;
  status?: STATUS_ENUM | string;
  uuid?: string;
};

enum STATUS_ENUM {
  set_to_ready_to_ship = 'set_to_ready_to_ship',
  set_to_shipped = 'set_to_shipped',
  se_to_cancelled = 'set_to_cancelled',
}
