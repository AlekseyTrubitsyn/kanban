/**
** It's just a front-end app without server,
** so axiosWrapper gets some fake data from
** the backInFront module.
**
** Originally use axios & RESTful API.
*/
import {
  _get,
  _post
} from './backInFront/index';

export const axiosWrapper = ({ method, url, data }) => {
  return new Promise((resolve, reject) => {
    let response = method === 'post' ? _post(url, data) : _get(url, data);

    if (response) {
      setTimeout(() => resolve(response), 700);
    } else {
      reject('An error occured. Please try again later');
    }
  })
}
