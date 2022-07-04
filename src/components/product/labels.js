export default {
  errors: {
    validation: {
      notEmpty: {
        name: 'El nombres es obligatorio',
        productCategoryID: 'El id de la categoria de producto es obligatorio'
      },
      isNumeric: {
        productCategoryID: 'El id de la categoria de producto es numerico'
      }
    },
    validationID: {
      errors: 'No se encontró el ID, vuelva a intentarlo'
    },
    data: {
      errors: 'No se encontró el nombre, vuelva a intentarlo'
    }
  },
  success: {
    response: {
      created: 'El producto se creó correctamente',
      updated: 'El producto se actualizó correctamente',
      deleted: 'Se eliminó el producto satisfactoriamente'
    }
  }
}
