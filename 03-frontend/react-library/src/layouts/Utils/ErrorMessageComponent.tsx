const errorMessageComponent = (props: any) => {
  return (<div className='alert alert-danger'>{props.children}</div>)
}

export default errorMessageComponent
