var mssql = require('mssql');
var logger = require('elogger');

function Query(config) {
	this.dbConfig = {
		server: config.host,
		port: config.port || 1433,
    	user: config.username,
    	password: config.password,
    	database: config.database,
    	options: {
        	encrypt: config.encryption || false
    	}
	};
	this.tableName = null;
	this.params = {};
	this.whereParams = {};
}

Query.prototype.table = function(tableName) {
	this.tableName = tableName;
	return this;
};

Query.prototype.data = function(paramList) {
	this.params = paramList;
	return this;
};

Query.prototype.where = function(paramList) {
	this.whereParams = paramList;
	return this;
};

Query.prototype.insert = function(successCallback, failedCallback) {
	var params = this.params;
	var tableName = this.tableName;
	var dbConfig = this.dbConfig;

	mssql.connect(dbConfig, function(err) {
		if(err) {
			logger.error(err);
			failedCallback(err);
		}
		else {
			var sql = 'INSERT INTO ' + tableName;
			sql += ' (' + Object.keys(params).join(',') + ') VALUES (';
			Object.keys(params).forEach(function(key) {
				sql += '\'' + params[key] + '\', ';
			});
			sql = sql.slice(0, -2);
			sql += ')';
						
			var request = new mssql.Request();
		    request.query(sql, function(err, recordset) {
		    	if(err)
		    		failedCallback(err, sql);
		    	else
		    		successCallback(recordset);
		    });
		}
		
	});
};


Query.prototype.update = function(successCallback, failedCallback) {
	var tableName = this.tableName;
	var params = this.params;
	var whereParams = this.whereParams;
	var dbConfig = this.dbConfig;
	var connection = this.connection;
	
	mssql.connect(dbConfig, function(err) {
		if(err) {
			logger.error(err);
			failedCallback(err);
		}
		else {
			var sql = 'UPDATE ' + tableName + ' SET ';
			Object.keys(params).forEach(function(key) {
				sql += key + '=' + '\'' + params[key] + '\', ';
			});
			sql = sql.slice(0, -2);
			
			if(whereParams && Object.keys(whereParams).length > 0) {
				sql += ' WHERE '
				Object.keys(whereParams).forEach(function(key) {
					sql += key + '=' + '\'' + whereParams[key] + '\' AND ';
				});
				sql = sql.slice(0, -5);
			}
			
			var request = new mssql.Request();
		    request.query(sql, function(err, recordset) {
		    	if(err)
		    		failedCallback(err, sql);
		    	else
		    		successCallback(recordset);
		    });
		}
		
	});
};

// export the class
module.exports = Query;