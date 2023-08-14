import axios from 'axios'
import MessageModel from '../models/MessageModel'
import { useOktaAuth } from '@okta/okta-react'
import { useState, useEffect } from 'react'
import AdminMessageRequestModel from '../models/AdminMessageRequestModel'

const baseUrl = process.env.REACT_APP_BASE_URL

interface postMessageApiProps {
  title: string,
  question: string,
  accessToken: string | undefined,
}

interface putMessageApiProps {
  id: number | undefined,
  responseDesc: string,
  accessToken: string | undefined
}

interface useMessageApiProps {
  currentPage: number,
  messagePerPage: number
}

interface useGetOpenMessagesApiProps {
  currentPage: number,
  messagePerPage: number,
  submitResponse: number
}

interface useMessageApiReturnType {
  messages: MessageModel[],
  isLoadingMessage: boolean,
  httpErrorMessage: Error | null,
  returnTotalPages: number
}

interface useGetOpenMessagesApiReturnType {
  messages: MessageModel[],
  isLoadingMessage: boolean,
  httpErrorMessage: Error | null,
  returnTotalPages: number
}

export const postMessageApi = (props: postMessageApiProps): void => {

  const url = `${baseUrl}/api/messages/secure/add/message`
  const messageRequest: MessageModel = new MessageModel(props.title, props.question)
  axios.post(url, JSON.stringify(messageRequest), {
    headers: {
      Authorization: `Bearer ${props.accessToken}`,
      "Content-Type": "application/json"
    }
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.error(error.message);
  })
}

export const putMessageApi = async (props: putMessageApiProps): Promise<any> => {
  const url = `${baseUrl}/api/messages/secure/admin/message`
  const adminMessageRequestModel: AdminMessageRequestModel = new AdminMessageRequestModel(props.id, props.responseDesc);
  try {
    const response = await axios.put(url, JSON.stringify(adminMessageRequestModel), {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
        "Content-Type": "application/json"
      }
    })
    return response;
  }
  catch (err) {
    console.error(err);
  }



  // if (response.status === 200) {
  //   console.log('update submit response')
  //   props.setSubmitResponse(props.submitResponse + 1);
  // }
}

const useMessageApi = (props: useMessageApiProps): useMessageApiReturnType => {
  const { authState } = useOktaAuth();
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [isLoadingMessage, setIsLoadingMessage] = useState(true);
  const [httpErrorMessage, setHttpErrorMessage] = useState(null);

  const [returnTotalPages, setReturnTotalPages] = useState<number>(1);
  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      let url = `${baseUrl}/api/messages/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`
      url += `&page=${props.currentPage - 1}&size=${props.messagePerPage}`
      axios.get(url)
        .then((response) => {
          const responseData = response.data._embedded.messages;
          const loadedMessages: MessageModel[] = []

          setReturnTotalPages(response.data.page.totalPages)
          for (const key in responseData) {
            loadedMessages.push({
              id: responseData[key].id,
              userEmail: responseData[key].userEmail,
              title: responseData[key].title,
              question: responseData[key].question,
              adminEmail: responseData[key].adminEmail,
              response: responseData[key].response,
              closed: responseData[key].closed
            })
            setMessages(loadedMessages);
            setIsLoadingMessage(false);
          }
        })
        .catch((error) => {
          setHttpErrorMessage(error);
          setIsLoadingMessage(false);
        })
    }
    setIsLoadingMessage(false);
    window.scroll(0, 0);
  }, [authState, props.currentPage])
  return { messages, isLoadingMessage, httpErrorMessage, returnTotalPages }
}

export const useGetOpenMessagesApi = (props: useGetOpenMessagesApiProps): useGetOpenMessagesApiReturnType => {
  const { authState } = useOktaAuth();
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [isLoadingMessage, setIsLoadingMessage] = useState(true);
  const [httpErrorMessage, setHttpErrorMessage] = useState(null);
  const [returnTotalPages, setReturnTotalPages] = useState<number>(1);

  useEffect(() => {
    console.log("props.submitResponse: ", props.submitResponse);
    if (authState && authState.isAuthenticated) {
      let url = `${baseUrl}/api/messages/search/findByClosed?closed=false`
      url += `&page=${props.currentPage - 1}&size=${props.messagePerPage}`

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          const responseData = response.data._embedded.messages
          const loadedMessages: MessageModel[] = []
          setReturnTotalPages(response.data.page.totalPages);

          for (const key in responseData) {
            loadedMessages.push({
              id: responseData[key].id,
              userEmail: responseData[key].userEmail,
              title: responseData[key].title,
              question: responseData[key].question,
              adminEmail: responseData[key].adminEmail,
              response: responseData[key].response,
              closed: responseData[key].closed
            })
            setMessages(loadedMessages);
            setIsLoadingMessage(false);
          }
        })
        .catch((error) => {
          setHttpErrorMessage(error);
          setIsLoadingMessage(false);
        })
    }
    setIsLoadingMessage(false);
    window.scroll(0, 0);
  }, [authState, props.currentPage, props.submitResponse])
  return { messages, isLoadingMessage, httpErrorMessage, returnTotalPages }
}

export default useMessageApi;
