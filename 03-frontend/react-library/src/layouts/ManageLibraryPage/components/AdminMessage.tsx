import React from 'react'
import MessageModel from '../../../models/MessageModel'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import errorMessageComponent from '../../Utils/ErrorMessageComponent'

const initialValues = {
  description: ''
}
const validationSchema = Yup.object({
  description: Yup.string().required()
})

const AdminMessage: React.FC<{ message: MessageModel }> = (props, key) => {

  const onSubmitHandler = (values: any, { resetForm }: any) => {
    console.log(values);
    resetForm();
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
          onSubmit={(values, { resetForm }) => { onSubmitHandler(values, { resetForm }) }}>
          <Form>
            <div className='col-md-12 mb-3'>
              <label className='form-label' htmlFor='description'>Description</label>
              <Field as='textarea' name='description' id='description' className='form-control'
                rows={3} placeholder='Your response' />
              <ErrorMessage name='description' component={errorMessageComponent} />
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

export default AdminMessage
