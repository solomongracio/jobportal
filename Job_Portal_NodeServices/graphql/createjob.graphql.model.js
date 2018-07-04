export let CreateJobGQLType = new GraphQLObjectType({
    name: 'CreateJobGQLType',
    description: 'single use coupon',
    fields: {
        _id: {type: GraphQLString},
        jobId: {type: GraphQLString},
        jobDescription: {type: GraphQLString},
        position: {type: GraphQLString},
        band: {type: GraphQLBoolean},
        location: {type: GraphQLString},
        hiringManager: {type: GraphQLString},
        recuriter: {type: GraphQLString},
        keySkills: {type: GraphQLString},
        secondarySkills: {type: GraphQLString},
        startDate: {type: GraphQLString},
		endDate: {type: GraphQLString},
        createdBy: {type: GraphQLString}
    }
});