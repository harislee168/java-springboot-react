import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import errorMessageComponent from '../../Utils/ErrorMessageComponent'
import { categoriesArray } from '../../Utils/Constant'
import { useOktaAuth } from '@okta/okta-react'
import AddBookRequestModel from '../../../models/AddBookRequestModel'
import { addNewBookApi } from '../../../api/adminBookApi'

const initialValues = {
  title: '',
  author: '',
  category: categoriesArray[1].key,
  description: '',
  copies: 0,
  img: '',
}

const validationSchema = Yup.object({
  title: Yup.string().required(),
  author: Yup.string().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
  copies: Yup.number().positive().required()
})

const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

const handleImage = async (e: any, setFieldValue: any, fieldName: string) => {
  if (e.target.files[0]) {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFieldValue(fieldName, base64);
  }
}

const AddNewBook = () => {
  const { authState } = useOktaAuth();
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const onSubmitHandler = (values: any, { resetForm }: any) => {
    if (authState && authState.isAuthenticated) {
      const addBookRequestModel: AddBookRequestModel = new AddBookRequestModel(values.title,
        values.author, values.description, values.copies, values.category);

      if (values.img !== '') {
        addBookRequestModel.img = values.img
      }
      addNewBookApi({addBookRequestModel: addBookRequestModel, accessToken: authState.accessToken?.accessToken})
      resetForm();
      setDisplaySuccess(true);
    }
  }

  return (
    <div className='container mt-5 mb-5'>
      <div className='card'>
        <div className='card-header'>
          Add new book
        </div>
        <div className='card-body'>
          {
            displaySuccess &&
            <div className='alert alert-success' role='alert'>Book added successfully</div>
          }
          <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => { onSubmitHandler(values, { resetForm }) }} validationSchema={validationSchema}>
            <Form>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label className='form-label' htmlFor='title'>Title</label>
                  <Field type='text' className='form-control' name='title' id='title' placeholder='Title' />
                  <ErrorMessage name='title' component={errorMessageComponent} />
                </div>
                <div className='col-md-3 mb-3'>
                  <label className='form-label' htmlFor='author'>Author</label>
                  <Field type='text' className='form-control' name='author' id='author' placeholder='Author' />
                  <ErrorMessage name='author' component={errorMessageComponent} />
                </div>
                <div className='col-md-3 mb-3'>
                  <label className='form-label' htmlFor='author'>Category</label>
                  <Field as='select' id='category' name='category' className='form-select'>
                    {
                      categoriesArray.slice(1).map((category) => {
                        return (
                          <option key={category.key} value={category.key}>{category.value}</option>
                        )
                      })
                    }
                  </Field>
                  <ErrorMessage name='category' component={errorMessageComponent} />
                </div>
              </div>
              <div className='col-md-12 mb-3'>
                <label className='form-label' htmlFor='description'>Description</label>
                <Field as='textarea' className='form-control' name='description' id='description' rows={3} placeholder='Description' />
                <ErrorMessage name='description' component={errorMessageComponent} />
              </div>
              <div className='col-md-3 mb-3'>
                <label className='form-label' htmlFor='copies'>Copies</label>
                <Field type='number' className='form-control' name='copies' id='copies' rows={3} placeholder='Copies' />
                <ErrorMessage name='copies' component={errorMessageComponent} />
              </div>
              <div>
                <Field name='img' id='img'>
                  {
                    ({ form, field }: any) => {
                      const { setFieldValue } = form
                      return (
                        <input type='file' className='form-control' accept="image/*" onChange={(e) => handleImage(e, setFieldValue, field.name)} />
                      )
                    }
                  }
                </Field>
              </div>
              <div>
                <button type='submit' className='btn btn-primary mt-3'>Add Book</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddNewBook
