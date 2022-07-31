import { SharedArray } from 'k6/data';

const users = new SharedArray('users',function(){
    return JSON.parse(open('./users.json'));
})

const base_user = JSON.parse(open('./base_user.json'));

export function getUser(){
    return {user_id: users[Math.floor(Math.random() * users.length)].user_id, password: base_user.password};
}