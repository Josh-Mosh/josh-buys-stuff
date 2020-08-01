import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Set, { schema } from './model'

const router = new Router()
const { setId, name, description, pieces, age, price, imgUrl, affiliateLink, favorite, videoId, videoUploaded, theme } = schema.tree

/**
 * @api {post} /set Create set
 * @apiName CreateSet
 * @apiGroup Set
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam setId Set's setId.
 * @apiParam name Set's name.
 * @apiParam description Set's description.
 * @apiParam pieces Set's pieces.
 * @apiParam age Set's age.
 * @apiParam price Set's price.
 * @apiSuccess {Object} set Set's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Set not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ setId, name, description, pieces, age, price, imgUrl, affiliateLink, favorite, videoId, videoUploaded, theme }),
  create)

/**
 * @api {get} /set Retrieve set
 * @apiName RetrieveSet
 * @apiGroup Set
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of set.
 * @apiSuccess {Object[]} rows List of set.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /set/:id Retrieve set
 * @apiName RetrieveSet
 * @apiGroup Set
 * @apiSuccess {Object} set Set's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Set not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /set/:id Update set
 * @apiName UpdateSet
 * @apiGroup Set
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam setId Set's setId.
 * @apiParam name Set's name.
 * @apiParam description Set's description.
 * @apiParam pieces Set's pieces.
 * @apiParam age Set's age.
 * @apiParam price Set's price.
 * @apiSuccess {Object} set Set's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Set not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ setId, name, description, pieces, age, price, imgUrl, affiliateLink, favorite, videoId, videoUploaded, theme }),
  update)

/**
 * @api {delete} /set/:id Delete set
 * @apiName DeleteSet
 * @apiGroup Set
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Set not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
