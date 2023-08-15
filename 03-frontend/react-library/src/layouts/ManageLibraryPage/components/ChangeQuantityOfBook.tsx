import { useState, useEffect } from 'react'
import BookModel from '../../../models/BookModel'
import { decreaseBookQuantityApi, deleteBookApi, increaseBookQuantityApi } from '../../../api/adminBookApi';
import { useOktaAuth } from '@okta/okta-react';

const ChangeQuantityOfBook: React.FC<{ book: BookModel, addReloadNumber: any }> = (props, key) => {
  const { authState } = useOktaAuth();
  const [quantity, setQuantity] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [negativeQuantity, setNegativeQuantity] = useState(false);
  const [stillHaveLoans, setStillHaveLoans] = useState(false);

  useEffect(() => {
    const fetchBookInState = () => {
      props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
      props.book.copiesAvailable ? setRemaining(props.book.copiesAvailable) : setRemaining(0);
    }
    fetchBookInState();
  }, [])

  const increaseQuantityButtonHandler = () => {
    setNegativeQuantity(false);
    increaseBookQuantityApi({ bookId: props.book.id, accessToken: authState?.accessToken?.accessToken })
      .then((response) => {
        if (response.status === 200) {
          setQuantity((prevValue: number) => { return prevValue + 1 });
          setRemaining((prevValue: number) => { return prevValue + 1 });
        }
      })
  }

  const decreaseQuantityButtonHandler = () => {
    decreaseBookQuantityApi({ bookId: props.book.id, accessToken: authState?.accessToken?.accessToken })
      .then((response) => {
        if (response.status === 200) {
          if (response.data === true) {
            setQuantity((prevValue: number) => { return prevValue - 1 });
            setRemaining((prevValue: number) => { return prevValue - 1 });
          }
          else {
            setNegativeQuantity(true);
            setTimeout(() => {
              setNegativeQuantity(false);
            }, 3000);
          }
        }
      })
  }

  const deleteBookButtonHandler = () => {
    deleteBookApi({ bookId: props.book.id, accessToken: authState?.accessToken?.accessToken })
      .then((response) => {
        if (response.status === 200) {
          if (response.data === true) {
            props.addReloadNumber();
          }
          else {
            setStillHaveLoans(true);
            setTimeout(() => {
              setStillHaveLoans(false);
            }, 3000);
          }
        }
      })
  }

  return (
    <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
      <div className='row g-0'>
        <div className='col-md-2'>
          <div className='d-none d-lg-block'>
            {
              props.book.img ? <img src={props.book.img} width='123' height='196' alt="Book" /> :
                <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} width='123' height='196' alt="Book" />
            }
          </div>
          <div className='d-lg-none justify-content-center align-items-center'>
            {
              props.book.img ? <img src={props.book.img} width='123' height='196' alt="Book" /> :
                <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} width='123' height='196' alt="Book" />
            }
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card-body'>
            <h5 className='card-title'>{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className='card-text'>{props.book.description}</p>
          </div>
        </div>
        <div className='col-md-4 mt-3'>
          <div className='d-flex justify-content-center align-items-center'>
            <p>Total Quantity: <b>{quantity}</b></p>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <p>Remaining: <b>{remaining}</b></p>
          </div>
        </div>
      </div>
      {
        negativeQuantity &&
        <div className='alert alert-danger' role='alert'>Cannot decrease quantity! No more copies!</div>
      }
      {
        stillHaveLoans &&
        <div className='alert alert-danger' role='alert'>Cannot delete book! Still have some copies out for loans</div>
      }
      <div className='mt-3 col-md-1'>
        <div className='d-flex justify-content-start'>
          <button className='btn btn-danger btn-md m-1' onClick={deleteBookButtonHandler}>Delete</button>
        </div>
      </div>
      <button className='btn btn-primary btn-md m-1' onClick={increaseQuantityButtonHandler}>
        Add Quantity</button>
      <button className='btn btn-warning btn-md m-1' onClick={decreaseQuantityButtonHandler}>
        Decrease Quantity</button>
    </div>
  )
}

export default ChangeQuantityOfBook
