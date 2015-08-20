#

## Starting mongodb

```
$ mongod --smallfiles
Wed Aug 19 09:41:36.316 [initandlisten] MongoDB starting : pid=11222 port=27017 dbpath=/data/db/ 64-bit host=kerion
Wed Aug 19 09:41:36.317 [initandlisten] db version v2.4.9
Wed Aug 19 09:41:36.317 [initandlisten] git version: nogitversion
Wed Aug 19 09:41:36.317 [initandlisten] build info: Linux orlo 3.2.0-58-generic #88-Ubuntu SMP Tue Dec 3 17:37:58 UTC 2013 x86_64 BOOST_LIB_VERSION=1_54
Wed Aug 19 09:41:36.317 [initandlisten] allocator: tcmalloc
Wed Aug 19 09:41:36.317 [initandlisten] options: { smallfiles: true }
Wed Aug 19 09:41:36.328 [initandlisten] journal dir=/data/db/journal
Wed Aug 19 09:41:36.328 [initandlisten] recover : no journal files present, no recovery needed
Wed Aug 19 09:41:36.667 [initandlisten] preallocateIsFaster=true 3.04
Wed Aug 19 09:41:37.034 [initandlisten] preallocateIsFaster=true 2.88
Wed Aug 19 09:41:38.379 [initandlisten] preallocateIsFaster=true 2.8
Wed Aug 19 09:41:38.379 [initandlisten] preallocating a journal file /data/db/journal/prealloc.0
Wed Aug 19 09:41:40.172 [initandlisten] preallocating a journal file /data/db/journal/prealloc.1
Wed Aug 19 09:41:42.146 [initandlisten] preallocating a journal file /data/db/journal/prealloc.2
Wed Aug 19 09:41:44.211 [FileAllocator] allocating new datafile /data/db/local.ns, filling with zeroes...
Wed Aug 19 09:41:44.211 [FileAllocator] creating directory /data/db/_tmp
Wed Aug 19 09:41:44.230 [FileAllocator] done allocating datafile /data/db/local.ns, size: 16MB,  took 0.01 secs
Wed Aug 19 09:41:44.230 [FileAllocator] allocating new datafile /data/db/local.0, filling with zeroes...
Wed Aug 19 09:41:44.240 [FileAllocator] done allocating datafile /data/db/local.0, size: 16MB,  took 0.009 secs
Wed Aug 19 09:41:44.248 [websvr] admin web console waiting for connections on port 28017
Wed Aug 19 09:41:44.248 [initandlisten] waiting for connections on port 27017
```

See http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/

## Useful commands

See http://docs.mongodb.org/manual/reference/method/js-database/

### List database

```
> show dbs
```

### Use a database

```
> use <DATABASE-NAME>
```

### List all collections in a database

```
> show collections
```

or

```
> db.getCollectionNames()
> db.listCollections()
```

See http://stackoverflow.com/questions/8866041/how-to-list-all-collections-in-the-mongo-shell

### Get collection fields

See http://blog.optimal.io/how-to-find-the-schema-of-a-collection-in-mongodb/

This requires to have at least one element in the collection since MongoDB is schema-less.

```
> var schematodo = db.tasks.findOne();
> for (var key in schematodo) { print (key) ; }
_id
label
content
```

### Indexes

See http://docs.mongodb.org/manual/core/index-multikey/

```
> db.users.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"ns" : "chat-room-dev.users",
		"name" : "_id_"
	},
	{
		"v" : 1,
		"key" : {
			"username" : 1
		},
		"unique" : true,
		"ns" : "chat-room-dev.users",
		"name" : "username_1",
		"background" : true
	}
]
```

### Query

See http://docs.mongodb.org/manual/reference/method/db.collection.find/

```
> db.posts.find()
{ "message" : "hello", "_user" : ObjectId("55d4536f177851812b326429"), "_id" : ObjectId("55d4536f177851812b32642a"), "__v" : 0 }
{ "message" : "hello", "_user" : ObjectId("55d4539f59c5abaa2dc0090c"), "_id" : ObjectId("55d4539f59c5abaa2dc0090d"), "__v" : 0 }
{ "message" : "hello", "_user" : ObjectId("55d453b3bcd86b712ee82835"), "_id" : ObjectId("55d453b3bcd86b712ee82836"), "__v" : 0 }
{ "message" : "hello", "_user" : ObjectId("55d453bfe81cebe52e03a3b6"), "_id" : ObjectId("55d453bfe81cebe52e03a3b7"), "__v" : 0 }
```

### Drop collection

```
> db.users.drop()
true
```