const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema} = graphql;

const students = [
    { id: '1', name: 'Frank', address: '1 Fake Street', tutorid: "1" },
    { id: '2', name: 'Sebastian', address: '2 Fake Street' , tutorid: "2"},
    { id: '3', name: 'Paul', address: '3 Fake Street', tutorid: "3" },
    { id: '4', name: 'Tom', address: '4 Fake Street', tutorid: "4" },
    { id: '5', name: 'Jim', address: '5 Fake Street', tutorid: "2" },
    { id: '6', name: 'Jess', address: '6 Fake Street', tutorid: "2" },
    { id: '7', name: 'Helen', address: '7 Fake Street', tutorid: "2" },
    { id: '8', name: 'Lucy', address: '8 Fake Street', tutorid: "3" },
    { id: '9', name: 'Lyle', address: '9 Fake Street', tutorid: "3" },
    { id: '10', name: 'Sebastiaan', address: '10 Fake Street', tutorid: "4" },
];

const tutors = [
    {id: '1', name: 'Prof Turning'},
    {id: '2', name: 'Prof Kennedy'},
    {id: '3', name: 'Prof Bounce'},
    {id: '4', name: 'Dr Harrison'},
];

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        tutor: {
            type: TutorType,
            resolve(parent, args) {
                return _.find(tutors, {id: parent.tutorid})
            }
        }
    })
});

const TutorType = new GraphQLObjectType({
    name: 'Tutor',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args) {
                return _.filter(students, {tutorid: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student: {
            type: StudentType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(students, { id: args.id });
            }
        },
        tutor: {
            type: TutorType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(tutors, { id: args.id });
            }
        },
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args) {
                return students;
            }
        },
        tutors: {
            type: new GraphQLList(TutorType),
            resolve(parent, args) {
                return tutors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
    // mutation: xxxxxx
});