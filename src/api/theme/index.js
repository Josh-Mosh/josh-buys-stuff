import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Theme, { schema } from './model'

const router = new Router()
const { name, logoUrl, bgImageUrl, bgColor, fontTheme } = schema.tree

/**
 * @api {post} /themes Create theme
 * @apiName CreateTheme
 * @apiGroup Theme
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Theme's name.
 * @apiParam logoUrl Theme's logoUrl.
 * @apiSuccess {Object} theme Theme's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Theme not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, logoUrl, bgImageUrl, bgColor, fontTheme }),
  create)

/**
 * @api {get} /themes Retrieve themes
 * @apiName RetrieveThemes
 * @apiGroup Theme
 * @apiUse listParams
 * @apiSuccess {Object[]} themes List of themes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /themes/:id Retrieve theme
 * @apiName RetrieveTheme
 * @apiGroup Theme
 * @apiSuccess {Object} theme Theme's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Theme not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /themes/:id Update theme
 * @apiName UpdateTheme
 * @apiGroup Theme
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Theme's name.
 * @apiParam logoUrl Theme's logoUrl.
 * @apiSuccess {Object} theme Theme's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Theme not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, logoUrl, bgImageUrl, bgColor, fontTheme }),
  update)

/**
 * @api {delete} /themes/:id Delete theme
 * @apiName DeleteTheme
 * @apiGroup Theme
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Theme not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
