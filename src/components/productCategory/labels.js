export default {
  errors: {
    validation: {
      notEmpty: {
        nombre: 'El nombres es obligatorio',
        loanTypeID: 'El id tipo de prestamo es obligatorio',
        minInterest: 'El interes minimo es obligatorio',
        maxInterest: 'El interes maximo es obligatorio'
      },
      isNumeric: {
        loanTypeID: 'El id tipo de prestamo es numerico',
        minInterest: 'El interes minimo es numerico',
        maxInterest: 'El interes maximo es numerico'
      }
    },
    validationID: {
      errorsLoanTypeID: 'No se encontró el ID, vuelva a intentarlo',
      errorsInterest: 'Los intereces minimos y maximos son incorrectos'
    }
  },
  success: {
    response: {
      created: 'La categoria de producto  se creó correctamente',
      updated: 'La categoria de producto se actualizó correctamente',
      deleted: 'Se eliminó la categoria de producto satisfactoriamente'
    }
  }
}
