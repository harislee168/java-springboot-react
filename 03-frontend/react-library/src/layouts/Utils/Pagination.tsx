import React from 'react'

const Pagination: React.FC<{currentPage: number, totalPages: number, paginateHandler: any}> = (props) => {

  const pageNumbers = [];

  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }
  else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    }
    else {
      pageNumbers.push(props.currentPage - 1);
    }

    pageNumbers.push(props.currentPage);

    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }

  return (
    <nav aria-label='...'>
      <ul className='pagination'>
        <li className='page-item'>
          <button className='page-link' onClick={() => props.paginateHandler(1)}>First Page</button>
        </li>
        {
          pageNumbers.map((pageNumber) => {
            return (
              <li className={'page-item ' + (props.currentPage === pageNumber? 'active' : '')} key={pageNumber}>
                <button className='page-link' onClick={() => props.paginateHandler(pageNumber)}>{pageNumber}</button>
              </li>
            )
          })
        }
        <li className='page-item'>
          <button className='page-link' onClick={() => props.paginateHandler(props.totalPages)}>Last Page</button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
