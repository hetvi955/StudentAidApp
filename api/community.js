import client from './client';

const getCommunities = () => client.get("/community/user_communities");

const create = (name) => client.post("/community/create", { name });

const join = (communityId) => client.post("/community/join", { communityId });


export default {
  create,
  join,
  getCommunities,
};