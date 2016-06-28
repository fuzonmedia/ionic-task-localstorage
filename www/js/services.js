angular.module('starter.services', [])

// DB wrapper
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
        // self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); //for production/device
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';

            self.query(query,null,function(validate,result){
              if(validate){
                // insert Sample data for testing
                if(result.insertId>0)
                {
                  console.log('insert Sample data for testing');
                  var insertQuery='INSERT INTO ' + table.name + ' VALUES(NULL,\'Task 1\',\'Task Details 1\',0)';
                  insertQuery+=',(NULL,\'Task 2\',\'Task Details 2\',0)';
                  insertQuery+=',(NULL,\'Task 3\',\'Task Details 3\',0)';
                  self.query(insertQuery,null,function(validate,result){
                    if(validate){
                      console.log('Testing Data inserted');
                    }
                    else {
                      console.log('Error: '+ result.message);
                    }

                  });
                }
              }
              else {
                console.log(table.name + ' is not created');
              }
            });
            console.log('Table ' + table.name + ' initialized');
        });
    };


    self.query = function(query, bindings,callback) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                callback(true,result);
            }, function(transaction, error) {
                callback(false,error);
            });
        });
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
})
// Resource service example
.factory('Document', function(DB) {
    var self = this;

    self.all = function(flag,callback) {
        DB.query('SELECT * FROM documents_new WHERE isCompleted='+flag,null,function(validate,result){
        var mydata=DB.fetchAll(result);
        console.log(mydata);
        callback(mydata);
        });
    };

    self.getById = function(id,callback) {
        DB.query('SELECT * FROM documents_new WHERE id = ?', [id],function(validate,result){
          var mydata=DB.fetch(result);
          callback(mydata);
        });

    };

    self.MarkDone = function(id,callback) {
        DB.query('UPDATE documents_new SET isCompleted=1 WHERE id = ?', [id],function(validate,result){
          if(validate)
          {
            if(result.rowsAffected>0)
            {
              callback(true,result);
            }
            else {
                callback(false,result);
            }
          }
          else {
            callback(false,result);
          }
        });

    };
    self.AddTask = function(task,callback) {
        DB.query('INSERT INTO documents_new VALUES(NULL,\''+ task.TaskName+'\',\''+task.taskDetails+'\',0)', null ,function(validate,result){
          if(validate)
          {
            if(result.rowsAffected>0)
            {
              callback(true,result);
            }
            else {
                callback(false,result);
            }
          }
          else {
            callback(false,result);
          }
        });

    };

    return self;
});
