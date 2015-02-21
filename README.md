node-mssql-wrapper
=================

An easy-to-use MSSQL database wrapper for Node.js.

<h4>Installation:</h4>
```
$ npm install mssql-wrapper
```

<h4>Introduction</h4>
mssql-wrapper(pre-release) provides wrapper on top of mssql native connection interface to provider better usubility for most common queries. 
The plugin will allow following operations as follows:

<h4>Examples:</h4>

<h6>Insert Operation:</h6>
```
var mssql_wrapper = require('node-mssql-wrapper');

var queryObj = new mssql_wrapper.Query({
	host: 'x.x.x.x',
	port: 1433,
	username: 'myuser',
	password: 'mypassword',
	database: 'mydatabase'
});
queryObj.table('dbo.mytable')
.data({
	'title': 'My Test Insert',
	'description': 'My test insert description'
})
.insert(function(results) {
	console.log(results);
	process.exit();
}, function(err, sql) {
	if(err)
		console.log(err);
	
	console.log(sql);
});
```

<h6>Update Operation:</h6>
```
var mssql_wrapper = require('node-mssql-wrapper');

var queryObj = new mssql_wrapper.Query({
	host: 'x.x.x.x',
	port: 1433,
	username: 'myuser',
	password: 'mypassword',
	database: 'mydatabase'
});
queryObj.table('dbo.mytable')
.data({
	'title': 'My Test Update',
	'description': 'My test insert description'
})
.where({
	'title': 'My Test',
})
.update(function(results) {
	console.log(results);
	process.exit();
}, function(err, sql) {
	if(err)
		console.log(err);
	
	console.log(sql);
});
```

