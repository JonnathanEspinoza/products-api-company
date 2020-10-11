import { Router } from 'express';

import * as productsCtrl from '../controllers/products.controller';
import { verifyToken } from "../middlewares/index";

const router = Router();

router.post('/', verifyToken, productsCtrl.createProduct);
router.get('/', productsCtrl.getProducts);
router.get('/:productId',productsCtrl.getProductById);
router.put('/:productId', verifyToken, productsCtrl.updateProductById);
router.delete('/:productId', verifyToken, productsCtrl.deleteProductsById);

export default router;