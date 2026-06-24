// // import { betterAuth } from "better-auth";
// // import { MongoClient } from "mongodb";
// // import { mongodbAdapter } from "better-auth/adapters/mongodb";

// // const client = new MongoClient(process.env.MONGO_DB_URI);
// // const db = client.db(process.env.AUTH_DB_NAME);


// // // console.log("AUTH FILE LOADED");
// // export const auth = betterAuth({
// //       emailAndPassword: { 
// //     enabled: true, 
// //   }, 
// //   socialProviders: {
// //         google: { 
// //             clientId: process.env.GOOGLE_CLIENT_ID, 
// //             clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
// //         }, 
// //     },
// // user: {
// //     // ⚠️ EII SECTION-TI CRITICAL: Eta chara location database-e dhukbe na
// //     additionalFields: {
// //       location: {
// //         type: "string",
// //         required: true,      // optional/nullable korte চাইলে required: false dite paro
// //         defaultValue: "",
// //       },
// //       role:{
// //       default: "Buyer"
// //       },
// //     },
// //   },
// //   database: mongodbAdapter(db, {
// //     // Optional: if you don't provide a client, database transactions won't be enabled.
// //     client
// //   }),
// // });

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// // import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";



// const client = new MongoClient(process.env.MONGO_DB_URI);
// console.log("mongodbAdapter =", typeof mongodbAdapter);

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },

//   user: {
//     additionalFields: {
//       location: {
//         type: "string",
//         required: true,
//         defaultValue: "",
//       },
//       role: {
//         type: "string",
//         defaultValue: "Buyer",
//       },
//     },
//   },

//   database: mongodbAdapter(client),
// });


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);

const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      location: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      role: {
        type: "string",
        defaultValue: "Buyer",
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});