// import { success } from '../../services/response/'
// import { Set } from '../set/model';

export const index = (req, res, next) => {
  // console.log('QUERY ', query);
  console.log('params ', req.params);
  res.send('message from controller')
  // Set.find(query, select, cursor)
  //   .then((set) => set.map((set) => set.view()))
  //   .then(success(res, null, 'sets'))
  //   .catch(next)
}

export const show = ({ params }, res, next) => {
  console.log('PARAMS ', params);
  res.send('message from show in controller')
  // Set.findById(params.id)
  //   .then(notFound(res))
  //   .then((set) => set ? set.view() : null)
  //   .then(success(res, null, 'set'))
  //   .catch(next)
}
