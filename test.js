'use strict';

var bcrypt = require('bcryptjs');


var password = '1234567';


bcrypt.hash(password, 12, (err, hash) => {

})


bcrypt.compare(password, hash, (err, result) => {

})


// var hash = '$2a$10$hYCRiRJy6v7iETUBtILFn.UpPoCzCtOaieWmi.kHsnwMahaFUb/s2'



//   console.log('err:', err);
//   console.log('result:', result);



