import Set from '../set/model';
import { success, notFound } from '../../services/response/'

export default function(req, res, next) {
  console.log('params /  ', req.params);

  Set.findOne({ setId: req.params.setId })
    .then(notFound(res))
    .then((set) => {
      console.log('set ', set);
      if (set) {
        res.redirect(set.affiliateLink);
      }
      return set ? set.view() : null
    })
    .then(success(res, null))
    .catch(next)
}
