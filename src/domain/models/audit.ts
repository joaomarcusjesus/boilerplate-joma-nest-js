export enum ActionEnum {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETE = 'DELETE',
  LIST = 'LIST',
  FIND = 'FIND',
}

type AuditData = {
  customer_id: string;
  id: string;
  action: ActionEnum;
};

export class Audit {
  public customer_id: string;
  public id: string;
  public action: ActionEnum;

  constructor(data: AuditData) {
    this.customer_id = data.customer_id;
    this.action = data.action;
    this.id = data.id;
  }
}
