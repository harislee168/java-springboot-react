import { useOktaAuth } from '@okta/okta-react'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { postMessageApi } from '../../../api/useMessageApi'
import errorMessageComponent from '../../Utils/ErrorMessageComponent'

const initialValues = {
  title: '',
  question: ''
}

const validationSchema = Yup.object({
  title: Yup.string().required(),
  question: Yup.string().required()
})

const PostNewMessage = () => {
  const { authState } = useOktaAuth();
  const [displaySuccess, setDisplaySuccess] = useState(false);


  const onSubmitHandler = (values: any, { resetForm }: any) => {
    if (authState && authState.isAuthenticated) {
      postMessageApi({
        title: values.title, question: values.question,
        accessToken: authState.accessToken?.accessToken
      })
      resetForm();
      setDisplaySuccess(true);
    }
  }

  return (
    <div className='card mt-3'>
      <div className='card-header'>
        Ask question to our admin
      </div>
      <div className='card-body'>
        {
          displaySuccess &&
          <div className='alert alert-success' role='alert'>Question added successfully</div>
        }
        <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => { onSubmitHandler(values, { resetForm }) }} validationSchema={validationSchema}>
          <Form>
            <div className='mb-3'>
              <label className='form-label' htmlFor='title'>Title</label>
              <Field type='text' name='title' id='title' className='form-control' placeholder='Title' />
              <ErrorMessage name='title' component={errorMessageComponent} />
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor='question'>Question</label>
              <Field as='textarea' rows={3} name='question' id='question' className='form-control' placeholder='Enter your question' />
              <ErrorMessage name='question' component={errorMessageComponent} />
            </div>
            <div>
              <button type='submit' className='btn btn-primary mt-3'>Submit Question</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default PostNewMessage
