const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
  } = require("graphql");
  
  const Video = require("../models/Video");
  const Playlist = require("../models/Playlist");
  const RestrictedUser = require("../models/RestrictedUser");
  
  // Tipo Video
  const VideoType = new GraphQLObjectType({
    name: "Video",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      url: { type: GraphQLString },
      description: { type: GraphQLString }
    }),
  });
  
  // Tipo Playlist
  const PlaylistType = new GraphQLObjectType({
    name: "Playlist",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      videos: {
        type: new GraphQLList(VideoType),
        resolve(parent) {
          return Video.find({ _id: { $in: parent.videos } });
        }
      }
    }),
  });
  
  // Tipo Perfil
  const RestrictedUserType = new GraphQLObjectType({
    name: "RestrictedUser",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    })
  });
  
  // Root Query
  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      videos: {
        type: new GraphQLList(VideoType),
        resolve() {
          return Video.find();
        }
      },
      searchVideos: {
        type: new GraphQLList(VideoType),
        args: { name: { type: GraphQLString } },
        resolve(_, args) {
          return Video.find({ name: { $regex: args.name, $options: "i" } });
        }
      },
      playlists: {
        type: new GraphQLList(PlaylistType),
        resolve() {
          return Playlist.find();
        }
      },
      restrictedUsers: {
        type: new GraphQLList(RestrictedUserType),
        resolve() {
          return RestrictedUser.find();
        }
      }
    }
  });
  
  module.exports = new GraphQLSchema({
    query: RootQuery
  });
  