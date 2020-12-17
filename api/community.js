import client from './client';

const create = (name) => client.post("/community/create", { name });



export default {
  create,
};