type CredentialData = {
  access_token: string;
};

export class Credential {
  public access_token: string;

  constructor(data: CredentialData) {
    this.access_token = data.access_token;
  }
}
