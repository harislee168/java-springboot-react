class AdminMessageRequestModel {
  id?: number;
  response: string;

  constructor(id: number | undefined, response: string) {
    this.id = id;
    this.response = response;
  }
}

export default AdminMessageRequestModel;
