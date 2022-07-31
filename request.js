import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { getUser } from './users.js';

export const requests = new Counter('http_reqs');

export default function () {
  // simple get
  const get_res = http.get('http://localhost:8000');
  check(get_res, {
    'status is 200': (r) => r.status === 200,
  });
  // simple post
  const post_res = http.post('http://localhost:8000/user',JSON.stringify({"user_id":"apple"}));
  check(post_res, {
    'status is 200': (r) => r.status === 200,
  });
  // random post
  const fruits = ["apple","pine","banana","orange"];
  const fruit  = fruits[Math.floor(Math.random() * fruits.length)];
  const random_post_res = http.post('http://localhost:8000/user',JSON.stringify({"user_id":fruit}));
  check(random_post_res, {
    'status is 200': (r) => r.status === 200,
  });
  const user = getUser();
  const json_random_post_res = http.post('http://localhost:8000/user',JSON.stringify({"user_id":user.user_id}));
  check(json_random_post_res, {
    'status is 200': (r) => r.status === 200,
  });
  console.log(json_random_post_res.json())
}
