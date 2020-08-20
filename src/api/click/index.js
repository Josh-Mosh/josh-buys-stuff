import Set from '../set/model';
import { success, notFound } from '../../services/response/';
import { clientDomain } from '../../config';

export default function(req, res, next) {
  console.log('params /  ', req.params);

  Set.findOne({ setId: req.params.setId })
    .then((set) => {
      console.log('set ', set);
      if (set && set.affiliateLink) {
        res.redirect(set.affiliateLink);
      } else {
        res.redirect(clientDomain);
      }
    })
    .catch(next)
}
