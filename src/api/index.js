import { Router } from 'express';
import user from './user';
import auth from './auth';
import set from './set';
import theme from './theme';
import click from './click';
import { clientDomain } from '../config';

const router = new Router();

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user);
router.use('/auth', auth);
router.use('/sets', set);
router.use('/themes', theme);
// router.use('/:setId', click);

/* redirect all traffic that tries to visit root of api*/
// router.use('/', function(req, res, next) {
//   if (req.path === '/') {
//     res.redirect(clientDomain);
//   }
//   next();
// });

export default router;
