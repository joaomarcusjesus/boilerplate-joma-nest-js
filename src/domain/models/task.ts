type TaskData = {
  id: number;
  title: string;
  description: string;
  status: string;
  customer_id: number;
};

export class Task {
  public id: number;
  public title: string;
  public description: string;
  public status: string;
  public customer_id: number;

  constructor(data: TaskData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.customer_id = data.customer_id;
  }
}
