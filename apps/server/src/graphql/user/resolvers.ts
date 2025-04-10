const queries = {
  hello: (): string => {
    return "Hello World";
  },
};
const mutations = {
  createUser: (_: any): string => {
    console.log("createUser", _);

    return "returned value";
  },
};

const resolvers = {
  queries,
  mutations,
};

export { resolvers };
