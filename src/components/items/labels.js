export default {
  errors: {
    validationData: {
      name: {
        required: 'El nombre de la entidad bancaria es requerida',
        notEmpty: 'El nombre de la entidad bancaria no puede ser vacia'
      }
    },
    response: {
      badId: 'El id es incorrecto, por favor verifique que sea un número',
      notFound: 'No se encontró la entidad bancaria, vuelva a intentarlo'
    }
  },
  success: {
    response: {
      created: 'La entidad bancaria se creó correctamente',
      updated: 'La entidad bancaria se actualizó correctamente',
      deleted: 'Se eliminó la entidad bancaria satisfactoriamente'
    }
  }
}
