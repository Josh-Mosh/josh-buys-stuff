import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Sets, { schema } from './model'

const router = new Router()
const { setId, name, description, pieces, age, price, imgUrl, affiliateLink, favorite, videoId, videoUploaded } = schema.tree

/**
 * @api {post} /sets Create sets
 * @apiName CreateSets
 * @apiGroup Sets
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam setId Sets's setId.
 * @apiParam name Sets's name.
 * @apiParam description Sets's description.
 * @apiParam pieces Sets's pieces.
 * @apiParam age Sets's age.
 * @apiParam price Sets's price.
 * @apiSuccess {Object} sets Sets's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sets not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ setId, name, description, pieces, age, price, imgUrl, affiliateLink, favorite, videoId, videoUploaded }),
  create)

/**
 * @api {get} /sets Retrieve sets
 * @apiName RetrieveSets
 * @apiGroup Sets
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of sets.
 * @apiSuccess {Object[]} rows List of sets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /sets/:id Retrieve sets
 * @apiName RetrieveSets
 * @apiGroup Sets
 * @apiSuccess {Object} sets Sets's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sets not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /sets/:id Update sets
 * @apiName UpdateSets
 * @apiGroup Sets
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam setId Sets's setId.
 * @apiParam name Sets's name.
 * @apiParam description Sets's description.
 * @apiParam pieces Sets's pieces.
 * @apiParam age Sets's age.
 * @apiParam price Sets's price.
 * @apiSuccess {Object} sets Sets's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sets not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ setId, name, description, pieces, age, price, imgUrl, affiliateLink, favorite, videoId, videoUploaded }),
  update)

/**
 * @api {delete} /sets/:id Delete sets
 * @apiName DeleteSets
 * @apiGroup Sets
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Sets not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
