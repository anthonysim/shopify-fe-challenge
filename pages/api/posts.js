const { connectToDatabase } = require('../../db/mongodb');

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      return getPosts(req, res);
    }

    case 'POST': {
      return addPost(req, res);
    }
  }
}

