import client from './client';

const create = (name) => client.post("/community/create", { name });

const join = (communityId) => client.post("/community/join", { communityId });


export default {
  create,
  join,
};