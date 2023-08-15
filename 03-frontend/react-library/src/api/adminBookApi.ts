import axios from "axios";
import AddBookRequestModel from "../models/AddBookRequestModel"


interface addNewBookApiProps {
  addBookRequestModel: AddBookRequestModel;
  accessToken: string | undefined
}

interface inDeBookQuantityApiProps {
  bookId: number;
  accessToken: string | undefined
}

const baseUrl = process.env.REACT_APP_BASE_URL

export const addNewBookApi = (props: addNewBookApiProps): void => {
  const url = `${baseUrl}/api/admin/secure/add/book`
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

export const increaseBookQuantityApi = async (props: inDeBookQuantityApiProps): Promise<any> => {
  const url = `${baseUrl}/api/admin/secure/increase/book/quantity?book_id=${props.bookId}`
  try {
    const response = axios.put(url, {}, {
      headers: {
        "Authorization": `Bearer ${props.accessToken}`,
        "Content-Type": "application/json"
      }
    })
    return response;
  }
  catch (err) {
    console.log(err);
  }
}

export const decreaseBookQuantityApi = async (props: inDeBookQuantityApiProps): Promise<any> => {
  const url = `${baseUrl}/api/admin/secure/decrease/book/quantity?book_id=${props.bookId}`
  try {
    const response = axios.put(url, {}, {
      headers: {
        "Authorization": `Bearer ${props.accessToken}`,
        "Content-Type": "application/json"
      }
    })
    return response;
  }
  catch (err) {
    console.log(err);
  }
}

export const deleteBookApi = async (props: inDeBookQuantityApiProps): Promise<any> => {
  const url = `${baseUrl}/api/admin/secure/delete/book?book_id=${props.bookId}`
  try {
    const response = axios.delete(url, {
      headers: {
        "Authorization": `Bearer ${props.accessToken}`,
        "Content-Type": "application/json"
      }
    })
    return response;
  }
  catch (err) {
    console.log(err);
  }
}
