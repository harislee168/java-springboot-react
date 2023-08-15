import axios from "axios";
import AddBookRequestModel from "../models/AddBookRequestModel"


interface addNewBookApiProps {
  addBookRequestModel: AddBookRequestModel;
  accessToken: string | undefined
}
const baseUrl = process.env.REACT_APP_BASE_URL

export const addNewBookApi = (props: addNewBookApiProps): void => {
  const url=`${baseUrl}/api/admin/secure/add/book`
  axios.post(url, JSON.stringify(props.addBookRequestModel), {
    headers: {
      Authorization: `Bearer ${props.accessToken}`,
      "Content-Type": "application/json"
    }
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error.message);
  })
}
