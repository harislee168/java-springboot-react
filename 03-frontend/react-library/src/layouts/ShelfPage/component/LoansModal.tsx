import React from 'react'
import ShelfCurrentLoansModel from '../../../models/ShelfCurrentLoansModel'

const LoansModal: React.FC<{ shelfCurrentLoanModel: ShelfCurrentLoansModel, mobile: boolean,
  returnBookHandler: (bookId: number) => void }> = (props) => {
  return (
    <div className='modal fade' id={props.mobile ? `mobilemodal${props.shelfCurrentLoanModel.book.id}` :
      `modal${props.shelfCurrentLoanModel.book.id}`} data-bs-backdrop='static' data-bs-keyboard='false'
      aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.shelfCurrentLoanModel.book.id}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='model-title' id='staticBakdropLabel'>
              Loan Options
            </h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <div className='container'>
              <div className='mt-3'>
                <div className='row'>
                  <div className='col-2'>
                    {
                      props.shelfCurrentLoanModel.book.img ?
                        <img src={props.shelfCurrentLoanModel.book.img} width='56' height='87' alt='Book' />
                        :
                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width='56' height='87' alt='Book' />
                    }
                  </div>
                  <div className='col-10'>
                    <h6>{props.shelfCurrentLoanModel.book.author}</h6>
                    <h4>{props.shelfCurrentLoanModel.book.title}</h4>
                  </div>
                </div>
                <hr />
                {props.shelfCurrentLoanModel.daysLeft > 0 &&
                  <p className='text-secondary'>Due in {props.shelfCurrentLoanModel.daysLeft} days.</p>
                }
                {props.shelfCurrentLoanModel.daysLeft === 0 &&
                  <p className='text-success'>Due today.</p>
                }
                {props.shelfCurrentLoanModel.daysLeft < 0 &&
                  <p className='text-danger'>Past due by {props.shelfCurrentLoanModel.daysLeft} days.</p>
                }
                <div className='list-group mt-3'>
                  <button className='list-group-item list-group-item-action list-group-item-dark' data-bs-dismiss='modal'
                  aria-current='true' onClick={() => props.returnBookHandler(props.shelfCurrentLoanModel.book.id)}>
                    Return book
                  </button>
                  <button data-bs-dismiss='modal'
                  className={props.shelfCurrentLoanModel.daysLeft < 0? 'list-group-item list-group-item-action inactivelink':
                  'list-group-item list-group-item-action'}>
                    {props.shelfCurrentLoanModel.daysLeft < 0 ? 'Late dues cannot be renewed' : 'Renew loan for 7 days'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button data-bs-dismiss='modal' type='button' className='btn btn-secondary'>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoansModal
