export default {
  errors: {
    validation: {
      signIn: {
        emailNotFound: 'El correo electronico no se encuentra registrado',
        passwordNotMatch: 'El correo y la contraseña son incorrectas, intentelo nuevamente'
      }
    },
    response: {
      badDocumentNumber: 'El numero de documento es incorrecto, por favor verifique que sea un número',
      badLengthDocumentNumber: 'El numero de documento debe tener entre 8 y 15 caracteres',
      badId: 'El id es incorrecto, por favor verifique que sea un número',
      notFound: 'No se encontró el cliente, vuelva a intentarlo'
    }
  },
  success: {
    response: {
      created: 'El cliente se creó correctamente',
      updated: 'El cliente se actualizó correctamente',
      deleted: 'Se eliminó el cliente satisfactoriamente'
    }
  }
}
