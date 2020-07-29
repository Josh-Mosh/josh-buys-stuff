import { success, notFound } from '../../services/response/'
import { Set } from '.'

export const create = ({ body }, res, next) =>
  Set.create(body)
    .then((set) => set.view(true))
    .then(success(res, 201, 'set'))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Set.find(query, select, cursor)
    .then((set) => set.map((set) => set.view()))
    .then(success(res, null, 'sets'))
    .catch(next)

export const show = ({ params }, res, next) =>
  Set.findById(params.id)
    .then(notFound(res))
    .then((set) => set ? set.view() : null)
    .then(success(res, null, 'set'))
    .catch(next)

export const update = ({ body, params }, res, next) => {
  let newSet = body.set ? body.set : {};
  Set.findById(params.id)
    .then(notFound(res))
    .then((set) => set ? Object.assign(set, newSet).save() : null)
    .then((set) => set ? set.view(true) : null)
    .then(success(res, null, 'set'))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  Set.findById(params.id)
    .then(notFound(res))
    .then((set) => set ? set.remove() : null)
    .then(success(res, 204))
    .catch(next)
