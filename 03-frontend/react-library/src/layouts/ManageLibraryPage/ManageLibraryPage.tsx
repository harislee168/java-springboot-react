import { useOktaAuth } from '@okta/okta-react';
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

const ManageLibraryPage = () => {
  const {authState} = useOktaAuth();
  const [isChangeQuantityOn, setIsQuantityOn] = useState(false);
  const [isMessageOn, setIsMessageOn] = useState(false);

  const addBookClickHandler = () => {
    setIsQuantityOn(false);
    setIsMessageOn(false);
  }

  const changeQuantityClickHandler = () => {
    setIsQuantityOn(true);
    setIsMessageOn(false);
  }

  const messageClickHandler = () => {
    setIsQuantityOn(false);
    setIsMessageOn(true);
  }

  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to='/home' />
  }

  return (
    <div className='container'>
      <div className='mt-5'>
        <h5>Manage Library</h5>
        <nav>
          <div className='nav nav-tabs' id='nav-tab' role='tablist'>
            <button className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab' data-bs-target='#nav-add-book'
            type='button' role='tab' aria-controls='nav-add-book' aria-selected='true' onClick={addBookClickHandler}>
              Add new book
            </button>
            <button className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab' data-bs-target='#nav-quantity'
            type='button' role='tab' aria-controls='nav-quantity' aria-selected='false' onClick={changeQuantityClickHandler}>
              Change quantity
            </button>
            <button className='nav-link' id='nav-messages-tab' data-bs-toggle='tab' data-bs-target='#nav-messages'
            type='button' role='tab' aria-controls='nav-messages' aria-selected='false' onClick={messageClickHandler}>
              Messages
            </button>
          </div>
        </nav>
        <div className='tab-content' id='nav-tabContent'>
          <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel' aria-labelledby='nav-add-book-tab'>
            <p>Add Book</p>
          </div>
          <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
            {isChangeQuantityOn? <p>Change Quantity</p>:<React.Fragment></React.Fragment>}
          </div>
          <div className='tab-pane fade' id='nav-messages' role='tabpanel' aria-labelledby='nav-messages-tab'>
            {isMessageOn?<p>Admin Messages</p>:<React.Fragment></React.Fragment>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageLibraryPage
