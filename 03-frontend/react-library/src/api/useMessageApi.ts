import axios from 'axios'
import MessageModel from '../models/MessageModel'

const baseUrl = process.env.REACT_APP_BASE_URL

interface postMessageApiProps {
  title: string,
  question: string,
  accessToken: string | undefined,
}

export const postMessageApi = (props: postMessageApiProps): void => {

  const url=`${baseUrl}/api/messages/secure/add/message`
  const messageRequest: MessageModel = new MessageModel(props.title, props.question)
  axios.post(url, JSON.stringify(messageRequest), {
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
