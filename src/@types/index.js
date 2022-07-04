// @ts-check

/**
 * @typedef Department
 *
 * @property {string} [_id] - Identificador
 * @property {string} [name] -Nombre del departamento
 */

/**
 * @typedef Provice
 *
 * @property {string} [_id] - Identificador
 * @property {string} [name] -Nombre de la provincia
 */

/**
 * @typedef District
 *
 * @property {string} [_id] - Identificador
 * @property {string} [name] -Nombre del distrito
 */

/**
 * @typedef User
 *
 * @property {number}   [_id] - Identificador corelativo
 * @property {string}   nickname - Nombre de perfil
 * @property {string}   email - Correo electronico del usuario
 * @property {string}   password - Contraseña del usuario
 * @property {boolean}  [deleted] - Indica si esta eliminado el documento
 */

/**
 * @typedef BankingEntity
 *
 * @property {number}   [_id] - Identificador correlativo
 * @property {string}   name - Nombre de la entidad bancaria
 * @property {boolean}  [deleted] - Indica si esta eliminado el documento
 */

/**
 * @typedef Item -Rubro
 *
 * @property {number}   [_id] - Identificador correlativo
 * @property {string}   name - Nombre del rubro
 * @property {boolean}  [deleted] - Indica si esta eliminado el documento
 */

/**
 * @typedef Client
 *
 * @property {number}     [_id] - Identificador de cliente
 * @property {string}     name - Nombres
 * @property {string}     lastname - Apellidos
 *
 * @property {object}     phone
 * @property {number}     phone.codCountry - Codigo de pais del numero celular
 * @property {number}     phone.number - Numero de celular
 *
 * @property {string}     email - Correo electronico
 * @property {string}     password - Contraseña
 *
 * @property {number}     profession - Id de la profesion que ejerce
 * @property {string}     maritalStatus - Nombre del estado civil
 * @property {string}     employmentStatus - Estado laboral
 *
 * @property {object}     addressData
 * @property {string}     addressData.address - Direccion
 * @property {string}     addressData.district - Id del distrito
 *
 * @property {object}     document
 * @property {number}     document.type - Id Tipo de documento
 * @property {string}     document.number - Numero de documento
 *
 * @property {object}     company
 * @property {number}     company.position - Id del cargo en la Empresa
 * @property {string}     company.name - Nombre de la Empresa que trabaja
 * @property {string}     company.address - Direccion de la Empresa que trabaja
 * @property {number}     company.item - Rubro de la Empresa que trabaja
 *
 * @property {number}     bankingEntity - Entidad bancaria
 * @property {string}     accountNumber - Numero de cuenta de la entidad
 *
 * @property {boolean}    [deleted] - Indica si esta eliminado el documento
 * @typedef Documenttype
 *
 * @property {number}   [_id] - Identificador corelativo
 * @property {string}   name - Nombre del TIPO DE DOCUMENTO
 */

/**
 * @typedef Position
 *
 * @property {number}   [_id] - Identificador corelativo
 * @property {string}   name - Nombre del cargo
 */

/**
 * @typedef Product
 *
 * @property {number}   [_id] - Identificador corelativo
 * @property {string}   name - Nombre del producto
 * @property {string}   category - Nombre de le categoria
 */

/**
 * @typedef LoanType
 *
 * @property {number}   [_id] - Identificador corelativo
 * @property {string}   name - Nombre de tipo de prestamo
 */

/**
 * @typedef ProductCategory
 *
 * @property {number}   [_id] - Identificador corelativo
 * @property {string}   name - Nombre de categoria de producto
 * @property {number}   [loanTypeID] - Identificador de tipo de prestamo
 * @property {number}   [minInterest] - Identificador del minimo interes
 * @property {number}   [maxInterest] - Identificador del maximo interes
 */
