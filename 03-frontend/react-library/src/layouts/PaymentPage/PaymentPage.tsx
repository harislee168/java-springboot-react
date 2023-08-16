import { useOktaAuth } from '@okta/okta-react'
import { useState, useEffect } from 'react'
import SpinnerLoading from '../Utils/SpinnerLoading';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PaymentInfoRequestModel from '../../models/PaymentInfoRequestModel';

const PaymentPage = () => {

  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [fees, setFees] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (authState && authState.isAuthenticated) {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const url = `${baseUrl}/api/payments/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`
      axios.get(url)
        .then((response) => {
          setFees(response.data.amount);
          setIsLoading(false);
        }).catch((error: any) => {
          console.log('error.response', error.response.status)
          if (error.response.status === 404){
            setFees(0);
          } else {
            setHttpError(error.message);
          }
          setIsLoading(false);
        })

    }
  }, [authState])

  const elements = useElements();
  const stripe = useStripe();

  const checkout = async () => {
    if (!stripe || !elements || !elements.getElement(CardElement)) {
       return;
    }
    setSubmitDisabled(true);
    let paymentInfo = new PaymentInfoRequestModel(Math.round(fees*100), 'USD', authState?.accessToken?.claims.sub);
    const baseUrl = process.env.REACT_APP_BASE_URL
    const paymentIntentUrl = `${baseUrl}/api/payment/secure/payment-intent`
    const requestOptions = {
      method:'POST',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentInfo)
    }
    const stripeResponse = await fetch(paymentIntentUrl, requestOptions);
    if (!stripeResponse.ok) {
      setHttpError(true);
      setSubmitDisabled(false);
      throw new Error('Something went wrong')
    }
    const stripeResponseJson = await stripeResponse.json();
    stripe.confirmCardPayment(
      stripeResponseJson.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            email: authState?.accessToken?.claims.sub
          }
        }
      }, {handleActions: false}
    ).then(async function (result: any) {
      if (result.error) {
        setSubmitDisabled(false);
        alert('There was an error')
      } else {
        const paymentCompleteUrl = `${baseUrl}/api/payment/secure/payment-complete`
        const requestOptions = {
          method:'PUT',
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json"
          }
        }
        const stripeResponse = await fetch(paymentCompleteUrl, requestOptions);
        if (!stripeResponse.ok) {
          setHttpError(true);
          setSubmitDisabled(false);
          throw new Error('Something went wrong')
        }
        setFees(0);
        setSubmitDisabled(false);
      }
    })
    setHttpError(false);
  }

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    )
  }

  return (
    <div className='container'>
      {
        fees > 0 &&
        <div className='card mt-3'>
          <h5 className='card-header'>Fees pending: <span className='text-danger'>${fees}</span></h5>
          <div className='card-body'>
            <h5 className='card-title mb-3'>Credit Card</h5>
            <p className='card-text mb-3 lead'>Use card number: <b className='text-primary'>4242 4242 4242 4242</b></p>
            <p className='card-text mb-5 lead'>Date: <b className='text-warning'>12/34</b> | CVC: <b className='text-warning'>567</b> | ZIP: <b className='text-warning'>12345</b></p>
            <CardElement id='card-element' />
            <button disabled={submitDisabled} type='button' className='mt-5 btn btn md btn-primary' onClick={checkout}>Pay fees</button>
          </div>
        </div>
      }
      {
        fees === 0 &&
        <div className='mt-5'>
          <h5>You have no outstanding fees</h5>
          <Link type='button' className='mt-3 btn btn-primary' to='/search'>Explore top books</Link>
        </div>
      }
      {submitDisabled && <SpinnerLoading />}
    </div>
  )
}

export default PaymentPage
