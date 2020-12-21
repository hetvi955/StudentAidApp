import client from './client';

const getCommunities = () => client.get("/community");

const getCommunityDetails = (id) => client.get(`/community/${id}`);

const create = (name) => client.post("/community/create", { name });

const join = (communityId) => client.post("/community/join", { communityId });


export default {
  create,
  join,
  getCommunities,
  getCommunityDetails,
};