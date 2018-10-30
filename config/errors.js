function VALIDATION_ERROR (err) {
  return {
    type: 'validation-error',
    message: parseErrorMsg(err.errors)
  }
}

function UNIQUE_ERROR (message) {
  return {
    type: 'unique-error',
    message
  }
}

function REFERENCE_ERROR (message) {
  return {
    type: 'reference-error',
    message: message
  }
}

function UPDATE_ERROR (message) {
  return {
    type: 'update-error',
    message: message
  } 
}

function parseErrorMsg (errors) {
  let message = ''
  for (let attr in errors) {
    message = message.concat(errors[attr]['message']).concat('. ')
  }
  return message.slice(0, -1)
}

module.exports.ERROR_HANDLER = (err) => {
  if (err.name === 'ValidationError') {
    return VALIDATION_ERROR(err)
  } else if (err.name === 'ReferenceError') {
    return REFERENCE_ERROR(err.message)
  } else if (err.name === 'UpdateError') {
    return UPDATE_ERROR(err.message)
  } else if (err.name === 'MongoError' && err.code === 11000) {
    return UNIQUE_ERROR(err.message)
  } else {
    return err.message
  }
}
