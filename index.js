
const Compute = require('@google-cloud/compute');
const compute = new Compute();
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

exports.list = (req, res) => {
   compute.getNetworks(function (err, networks) {
      let response = [];
      networks.forEach(net => {
          let info = {
              vpc: net.name,
              subnets: net.metadata.subnetworks
          }
          response.push(info);
           
      });
     db.collection('logs').add({response});
     res.setHeader('Content-Type', 'application/json');
     res.status(200).send(response);
   });

};
