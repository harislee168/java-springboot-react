import React, {useState} from 'react'
import useMessageApi from '../../../api/useMessageApi';
import SpinnerLoading from '../../Utils/SpinnerLoading';
import Pagination from '../../Utils/Pagination';

const Messages = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const paginateHandler = (pageNumber: number) => {setCurrentPage(pageNumber)}
  const { messages, isLoadingMessage, httpErrorMessage, returnTotalPages } = useMessageApi({
    currentPage: currentPage, messagePerPage: 5
  })

  if (isLoadingMessage) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpErrorMessage) {
    return (
      <div className='container m-5'>
        <p>{httpErrorMessage.toString()}</p>
      </div>
    )
  }

  return (
    <div className='mt-2'>
      {messages.length > 0 ?
        <React.Fragment>
          <h5>Current Q/A:</h5>
          {
            messages.map((message) => {
              return(
                <div key={message.id} className='card mt-2 shadow p-3 mb-3 bd-body rounded'>
                  <h5>Case #{message.id}: {message.title}</h5>
                  <h6>{message.userEmail}</h6>
                  <p>{message.question}</p>
                  <hr />
                  <div>
                    <h5>Response:</h5>
                    {
                      message.response && message.adminEmail ?
                      <React.Fragment>
                        <h6>{message.adminEmail} (admin)</h6>
                        <p>{message.response}</p>
                      </React.Fragment>
                      :
                      <p><i>Pending response from admin. Please be patience.</i></p>
                    }
                  </div>
                </div>
            )
          })}
        </React.Fragment>
        :
        <React.Fragment>
          <h5>All questions you submit will be shown here</h5>
        </React.Fragment>
      }

      {returnTotalPages > 1 && <Pagination currentPage={currentPage} totalPages={returnTotalPages}
        paginateHandler={paginateHandler}/>}
    </div>
  )
}

export default Messages
