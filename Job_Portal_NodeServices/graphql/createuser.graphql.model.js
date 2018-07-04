export let CreateUserGQLType = new GraphQLObjectType({
    name: 'CreateUserGQLType',
    description: 'single use coupon',
    fields: {
        _id: {type: GraphQLString},
        userId: {type: GraphQLString},
        userName: {type: GraphQLString},
        userPassword: {type: GraphQLString},
        userEmail: {type: GraphQLBoolean},
        keySkills: {type: GraphQLString},
        secondarySkills: {type: GraphQLString},
        candidateOrEmployee: {type: GraphQLString},
        userRole: {type: GraphQLString}
    }
});