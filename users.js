import { SharedArray } from 'k6/data';

const users = new SharedArray('users',function(){
    return JSON.parse(open('./users.json'));
})

export function getUser(){
    return users[Math.floor(Math.random() * users.length)];
}