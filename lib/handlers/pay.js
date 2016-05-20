module.exports = handler

var debug = require('../debug').insert
var wc = require('webcredits')
var fs = require('fs')

function handler(req, res) {

  var origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  var defaultCurrency = res.locals.config.currency || 'https://w3id.org/cc#bit';

  var source      = req.body.source;
  var destination = req.body.destination;
  var currency    = req.body.currency || defaultCurrency;
  var amount      = req.body.amount;
  var timestamp   = null;
  var description = req.body.description;
  var context     = req.body.context;




  if (!req.session.userId) {
    res.send('must be authenticated')
    return
  }

  var source      = req.session.userId

  if (!req.session.userId) {
    res.send('must be authenticated')
    return
  }


  var config = require('../../config/dbconfig.js');

  var sequelize = wc.setupDB(config);
  wc.getBalance(source, sequelize, config, function(err, ret){
    if (err) {
      console.error(err);
    } else {
      console.log(ret);

      if (ret > 25) {
        var img = fs.readFileSync('./assets/image/spiders-web-3.jpg')
        res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(img, 'binary');
      } else {
        res.statusCode = 402;
        res.send('HTTP 402!  This resource has paid access control!')        
      }


    }
    sequelize.close();
  });


}
