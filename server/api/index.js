	module.exports = function(connection) {

	    var router = require('express').Router();

	    router.get('/test', function(req, res) {
	        res.send('i am test');
	    });

	    router.get('/mayur', function(req, res) {
	        res.send('i am mayur');
	    })

	    router.post('/userReg', function(req, res) {
	        var data = {};
	        var name = req.body.name;

	        var mob = req.body.mob;
	        if (name == '') {
	            data.msg = "Invalid Username";
	            data.status = 200;
	            res.status(200).send(data);
	        } else {

	            if (mob == '' || isNaN(mob)) {
	                data.msg = "Invalid mob";
	                res.status(200).send(data);
	            } else {

	                var user = {
	                    name: name,
	                    mob: mob
	                }
	                connection.query('INSERT INTO user SET ?', user, function(err, rows) {
	                    if (err) {
	                        console.log(err)
	                    } else {
	                        res.send(rows);
	                    }
	                })
	            }
	        }
	    });




	    router.delete('/usrdelete', function(req, res){
	    	var data = {};
	    	var id = req.body.id;
	    

	    	if(id == ''){
	    		data.msg = "invalid id";
	    		data.status = 200;
	    		res.status(200).send(data);
	    	}else {
	    		var user = {
	    			id: id
	    		}
	    		console.log(id);
	    		connection.query('DELETE FROM user WHERE id = ?', id, function(err, rows) {
	    			if(err){
	    				console.log(err);
	    			}
	    			else{
	    				data.msg="user deleted";
	    				res.status(200).send(rows);
	    			}
	    		});
	    	}

	    	});


	    router.put('/updateusr', function(req, res){
	    	var data = {};
	    	var id = req.body.id;
	    	var name = req.body.name;

	    	if(id == ''){
	    		data.msg = "invalid id";
	    		data.status = 200;
	    		res.status(200).send(data);

	    	}else{
	    		connection.query('UPDATE user SET name = ? WHERE id = ?', [name, id], function(err, rows){
	    			if(err){
	    				console.log(err);
	    			}else{
	    				data.msg = "row updated";
	    				res.status(200).send(rows);
	    			}
	    		});
	    	}
	    });

	    router.post('/selectusr', function(req, res){
	    	var data = {};
	    	connection.query('SELECT * FROM user', function(err, rows, fields){
	    		if (err) {
	    			console.log(err);
	    		}else{
	    				data.msg = "data retrived sucessfully";
	    				res.status(200).send(rows);
	    			}
	    	})
	    });
	    



	    return router;
	}