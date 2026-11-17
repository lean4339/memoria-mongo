import { createRequire } from 'node:module';
const require = createRequire('/home/leandro/mongo-memory-mcp/package.json');
const { config } = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
config({ path: '/home/leandro/mongo-memory-mcp/.env', quiet: true });
const action = process.argv[2];
let client;
function string(value, name, max) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw new Error(`Invalid ${name}`);
  return value.trim();
}
function objectId(value) {
  if (typeof value !== 'string' || !/^[a-fA-F0-9]{24}$/.test(value)) throw new Error('Invalid id');
  return new ObjectId(value);
}
function tags(value = []) {
  if (!Array.isArray(value) || value.length > 20) throw new Error('Invalid tags');
  return value.map(tag => string(tag, 'tag', 60));
}
function fields(args) {
  return { content: string(args.content, 'content', 10000), project: string(args.project, 'project', 120), source: string(args.source, 'source', 1000), tags: tags(args.tags) };
}
try {
  if (!['ping', 'recall', 'remember', 'get', 'update', 'forget'].includes(action)) throw new Error('Invalid action');
  let input = '';
  for await (const chunk of process.stdin) {
    input += chunk;
    if (input.length > 65536) throw new Error('Input too large');
  }
  const args = JSON.parse(input || '{}');
  if (!args || typeof args !== 'object' || Array.isArray(args)) throw new Error('Invalid input');
  if (!process.env.MONGODB_URI) throw new Error('Missing connection');
  client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const db = client.db(process.env.MONGODB_DATABASE || 'assistant_memory');
  const collection = db.collection('memories');
  const namespace = process.env.MEMORY_NAMESPACE || 'default';
  const filter = { namespace };
  const projection = { namespace: 0 };
  let result;
  switch (action) {
    case 'ping': result = await db.command({ ping: 1 }); break;
    case 'recall': {
      const limit = args.limit ?? 10;
      if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw new Error('Invalid limit');
      if (args.project !== undefined) filter.project = string(args.project, 'project', 120);
      const selectedTags = tags(args.tags);
      if (selectedTags.length) filter.tags = { $all: selectedTags };
      if (args.query !== undefined && (typeof args.query !== 'string' || args.query.length > 200)) throw new Error('Invalid query');
      if (args.query?.trim()) filter.content = { $regex: args.query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
      result = await collection.find(filter, { projection }).sort({ updatedAt: -1 }).limit(limit).maxTimeMS(3000).toArray();
      break;
    }
    case 'remember': {
      const data = fields(args);
      const now = new Date();
      const inserted = await collection.insertOne({ ...data, namespace, createdAt: now, updatedAt: now });
      result = { id: inserted.insertedId.toHexString() };
      break;
    }
    case 'get': result = await collection.findOne({ ...filter, _id: objectId(args.id) }, { projection }); break;
    case 'update': {
      const updated = await collection.updateOne({ ...filter, _id: objectId(args.id) }, { $set: { ...fields(args), updatedAt: new Date() } });
      result = { found: updated.matchedCount === 1 };
      break;
    }
    case 'forget': {
      const deleted = await collection.deleteOne({ ...filter, _id: objectId(args.id) });
      result = { deleted: deleted.deletedCount === 1 };
      break;
    }
  }
  console.log(JSON.stringify(result));
} catch {
  console.error('Memoria: operación fallida. Revisar acción, JSON, conexión y estado de MongoDB. Credenciales omitidas.');
  process.exitCode = 1;
} finally {
  await client?.close();
}
