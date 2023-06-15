require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');

const deleteTemplate = require('./delete/deleteTemplate');
const {clone,getCloneData} = require('./clone/clone.js');
const save = require('./save/save.js');
const {createNew,getNewData,checkMaxTemplate} = require("./createNew/createNew");
const getData = require('./getData');  
/////////////////////////////////////////////////
const routerTemplate = express.Router();
routerTemplate.use(auth);
/////////////////////////////////////////////////

routerTemplate.post("/clone", async function(req, res) {
  try {
    const data = await getCloneData(req);
      await checkMaxTemplate(data.userId);
   clone(req, res);
   }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});
 
routerTemplate.post("/new", async function(req, res) {
  try{
  debugger;
    const data = await getData(req,['title']);
      await checkMaxTemplate(data.userId);
    const template = await createNew(data.title,data.userId);  

      return res.status(200).json({template});

  }catch (skillzaaError) {
  //--child fn return errors here we convert that to resonse
      return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});


routerTemplate.post( "/delete" , async function(req,res) {
  try {
  deleteTemplate(req,res);
  }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

routerTemplate.post("/save", async function(req, res) {
  try {
  save(req,res);
  }catch (skillzaaError) {
   return res.status(skillzaaError.statusCode || 500)
          .json(skillzaaError.getJson());
  }
});

////////////////////////////////////////////////////////
module.exports = routerTemplate;
////////////////////////////////////////////////////////


