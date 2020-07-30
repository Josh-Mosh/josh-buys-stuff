import { success, notFound } from '../../services/response/'
import { Theme } from '.'

export const create = ({ body }, res, next) => {
  let newTheme = body.theme ? body.theme : {};
  Theme.create(newTheme)
    .then((theme) => theme.view(true))
    .then(success(res, 201, 'theme'))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Theme.find(query, select, cursor)
    .then((themes) => themes.map((theme) => theme.view()))
    .then(success(res, null, 'themes'))
    .catch(next)

export const show = ({ params }, res, next) =>
  Theme.findById(params.id)
    .then(notFound(res))
    .then((theme) => theme ? theme.view() : null)
    .then(success(res, null, 'themes'))
    .catch(next)

export const update = ({ body, params }, res, next) => {
  let themeToUpdate = body.theme ? body.theme : {};
  Theme.findById(params.id)
    .then(notFound(res))
    .then((theme) => theme ? Object.assign(theme, themeToUpdate).save() : null)
    .then((theme) => theme ? theme.view(true) : null)
    .then(success(res, null, 'theme'))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  Theme.findById(params.id)
    .then(notFound(res))
    .then((theme) => theme ? theme.remove() : null)
    .then(success(res, 204))
    .catch(next)
