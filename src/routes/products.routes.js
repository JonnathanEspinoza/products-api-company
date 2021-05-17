import { Router } from 'express';

import * as productsCtrl from '../controllers/products.controller';
import { authJwt } from "../middlewares/index";

const router = Router();

// create product
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct);
// get all product
router.get('/', productsCtrl.getProducts);
// get product by id
router.get('/:productId', productsCtrl.getProductById);
// update product by id
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById);
// delete product by id
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductsById);

export default router;