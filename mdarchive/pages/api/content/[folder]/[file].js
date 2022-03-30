import { MongoClient, ObjectId } from "mongodb";


export default async function handler(req, res) {
  const { file, folder } = req.query;
  const db = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });;
  const notes = await db.db("notes")
  let content = await notes.collection(folder).find({ _id: ObjectId(file) }).toArray();
  content = content[0]?.content || "";
  db.close();
  res.status(200).json(content);
}
