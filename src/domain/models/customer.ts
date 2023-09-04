type CustomerData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
};

export class Customer {
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;
  public password?: string;

  constructor(data: CustomerData) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
  }
}
