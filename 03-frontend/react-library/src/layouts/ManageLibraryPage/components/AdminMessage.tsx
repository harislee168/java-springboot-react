import React from 'react'
import MessageModel from '../../../models/MessageModel'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import errorMessageComponent from '../../Utils/ErrorMessageComponent'
import { useOktaAuth } from '@okta/okta-react'
import { putMessageApi } from '../../../api/useMessageApi'

const initialValues = {
  response: ''
}
const validationSchema = Yup.object({
  response: Yup.string().required()
})

const AdminMessage: React.FC<{ message: MessageModel, submitResponse: number, setSubmitResponse: (value: number) => void }> = (props, key) => {

  const { authState } = useOktaAuth();

  const onSubmitHandler = (id: number | undefined, values: any, { resetForm }: any) => {
    if (authState && authState.isAuthenticated) {
      putMessageApi({
        id: id, accessToken: authState?.accessToken?.accessToken,
        responseDesc: values.response
      }).then((response) => {
          props.setSubmitResponse(props.submitResponse + 1);
        });

      resetForm();
    }
}

  return (
    <div key={props.message.id} className='card mt-2 shadow p-3 bd-body rounded'>
      <h5>Case #{props.message.id}: {props.message.title}</h5>
      <h6>{props.message.userEmail}</h6>
      <p>{props.message.question}</p>
      <hr />
      <div>
        <h5>Response:</h5>
        <Formik initialValues={initialValues} validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => { onSubmitHandler(props.message.id, values, { resetForm }) }}>
          <Form>
            <div className='col-md-12 mb-3'>
              <label className='form-label' htmlFor='response'>Response</label>
              <Field as='textarea' name='response' id='response' className='form-control'
                rows={3} placeholder='Your response' />
              <ErrorMessage name='response' component={errorMessageComponent} />
            </div>
            <div>
              <button type='submit' className='btn btn-primary mt-3'>Submit Response</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AdminMessage
