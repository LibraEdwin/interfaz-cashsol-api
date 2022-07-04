// @ts-check
/**
 * @fileoverview Archivo principal de manejo de rutas de toda la app
 * @version     1.0
 * @author      Interfaz
 *
 */
// @ts-ignore
import pkjConfig from '../../package.json'
import { Router } from 'express'
import routesClients from 'components/clients/routes'
import routesItems from 'components/items/routes'
import routesBankingEntities from 'components/bankingEntities/routes'
import routesUsers from 'components/users/routes'
import routesDocumentType from 'components/documentType/routes'
import routesDepartments from 'components/departments/routes'
import routesDistricts from 'components/districts/routes'
import routesProvinces from 'components/provinces/routes'
import routesPosition from 'components/position/routes'
import routesProfession from 'components/profession/routes'
import routesProduct from 'components/product/routes'
import routesLoanType from 'components/loanType/routes'
import routesProductCategory from 'components/productCategory/routes'
import routesProductDetail from 'components/productDetails/routes'

function router(app) {
  const routerMain = Router()

  routerMain.get('/', (req, res) => {
    return res.json({
      version: '1.1.0',
      info: {
        name: pkjConfig.name,
        description: pkjConfig.description,
        author: pkjConfig.author
      }
    })
  })

  routerMain.use('/departments', routesDepartments)
  routerMain.use('/districts', routesDistricts)
  routerMain.use('/provinces', routesProvinces)
  routerMain.use('/users', routesUsers)
  routerMain.use('/banking-entities', routesBankingEntities)
  routerMain.use('/items', routesItems)
  routerMain.use('/clients', routesClients)
  routerMain.use('/documentType', routesDocumentType)
  routerMain.use('/position', routesPosition)
  routerMain.use('/profession', routesProfession)
  routerMain.use('/product', routesProduct)
  routerMain.use('/loanType', routesLoanType)
  routerMain.use('/productCategory', routesProductCategory)
  routerMain.use('/product-details', routesProductDetail)

  app.use('/api/v1', routerMain)
}

export default router
