import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export default function () {
  // simple get
  const get_res = http.get('http://localhost:8000');
  check(get_res, {
    'status is 200': (r) => r.status === 200,
  });
  // simple post
  const post_res = http.post('http://localhost:8000/items',JSON.stringify({"price":100}));
  check(post_res, {
    'status is 200': (r) => r.status === 200,
  });
  console.log(post_res.json())
}
