import React, {useState} from 'react'
import { useGetOpenMessagesApi } from '../../../api/useMessageApi';
import Pagination from '../../Utils/Pagination';
import SpinnerLoading from '../../Utils/SpinnerLoading';
import AdminMessage from './AdminMessage';

const AdminMessages = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginateHandler = (pageNumber: number) => {setCurrentPage(pageNumber)};

  const { messages, isLoadingMessage, httpErrorMessage, returnTotalPages } = useGetOpenMessagesApi({
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
    <div className='mt-3'>
      {
        messages.length > 0 ?
        <React.Fragment>
          <h5>Pending Q/A:</h5>
          {
            messages.map((message) => {
              return(
                <AdminMessage message={message} key={message.id}/>
              )
            })
          }
        </React.Fragment>
        :
        <React.Fragment>
          <h5>No pending Q/A!</h5>
        </React.Fragment>
      }

    {returnTotalPages > 1 && <Pagination currentPage={currentPage} totalPages={returnTotalPages}
      paginateHandler={paginateHandler} />}
    </div>
  )
}

export default AdminMessages;
