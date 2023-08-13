import { useOktaAuth } from '@okta/okta-react'
import { useState, useEffect } from 'react'
import HistoryModel from '../models/HistoryModel';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL

interface useHistoriesApiProps {
  currentPage: number,
  historiesPerPage: number,
}

interface useHistoriesApiReturnType {
  histories: HistoryModel [],
  isLoadingHistory: boolean,
  httpErrorHistory: Error | null,
  returnTotalPages: number
}

const useHistoriesApi = (props: useHistoriesApiProps): useHistoriesApiReturnType => {
  const { authState } = useOktaAuth();
  const [histories, setHistories] = useState<HistoryModel[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [httpErrorHistory, setHttpErrorHistory] = useState(null);
  const [returnTotalPages, setReturnTotalPages] = useState<number>(1);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      let url = `${baseUrl}/api/histories/search/findHistoryByUserEmail?userEmail=${authState?.accessToken?.claims.sub}`
      url += `&page=${props.currentPage-1}&size=${props.historiesPerPage}`
      axios.get(url)
        .then((response) => {
          const responseData = response.data._embedded.histories;
          const loadedHistories: HistoryModel[] = [];
          setReturnTotalPages(response.data.page.totalPages);

          for (const key in responseData) {
            loadedHistories.push({
              id: responseData[key].id,
              userEmail: responseData[key].userEmail,
              checkoutDate: responseData[key].checkoutDate,
              returnedDate: responseData[key].returnedDate,
              title: responseData[key].title,
              author: responseData[key].author,
              description: responseData[key].description,
              img: responseData[key].img}
            )
          }
          setHistories(loadedHistories);
          setIsLoadingHistory(false);
        })
        .catch((error) => {
          setHttpErrorHistory(error);
          setIsLoadingHistory(false);
        })
    } else {
      setIsLoadingHistory(false);
    }
    window.scroll(0,0);
  }, [authState, props.currentPage])

  return { histories, isLoadingHistory, httpErrorHistory, returnTotalPages}
}

export default useHistoriesApi;
