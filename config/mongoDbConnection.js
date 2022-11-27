const MongoClient = requier("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

const dbName = "myblog";

let _db = null;

async function connectDb () {
  if(!_db) {
    const client = new MongoClient(url, { useUnifiedTopo})
  }
}