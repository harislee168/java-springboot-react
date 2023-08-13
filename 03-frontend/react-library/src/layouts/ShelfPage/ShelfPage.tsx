import React, { useState } from "react";
import Loans from "./component/Loans"
import HistoryPage from "./component/HistoryPage";


const ShelfPage = () => {
  const [isHistoryPageOn, setIsHistoryPageOn] = useState<boolean>(false);
  return (
    <div className='container'>
      <div className='mt-3'>
        <nav>
          <div className='nav nav-tabs' id='nav-tab' role='tablist'>
            <button className='nav-link active' id='nav-loans-tab' data-bs-toggle='tab'
              data-bs-target='#nav-loans' type='button' role='tab' aria-controls='nav-loans' aria-selected='true'
              onClick={() => setIsHistoryPageOn(false)}>
              Loans
            </button>
            <button className='nav-link' id='nav-history-tab' data-bs-toggle='tab'
              data-bs-target='#nav-history' type='button' role='tab' aria-controls='nav-history' aria-selected='false'
              onClick={() => setIsHistoryPageOn(true)}>
              My Loan History
            </button>
          </div>
        </nav>
        <div className='tab-content' id='nav-tabContent'>
        <div className='tab-pane fade show active' id='nav-loans' role='tabpanel' aria-labelledby='nav-loans-tab'>
            <Loans />
          </div>
          <div className='tab-pane fade' id='nav-history' role='tabpanel' aria-labelledby='nav-history-tab'>
            {isHistoryPageOn? <HistoryPage /> : <React.Fragment></React.Fragment>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShelfPage
