
//--Require
require('dotenv').config();
const Survey = require("../models/survey.js");
const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("../models/svyQuestion.js");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
const {ObjToSchema} = require('./schemaObj.js');

async function updateSurvey(req, res){
  try {
  // debugger;
    const incommingSurvey = req.body.survey; // the updated fields
    //---------------------------------------
    const questions = incommingSurvey.questions;
    //---object to schema.
    const newQuestions = await ObjToSchema(questions);
    if (newQuestions == null) {
        return res.status(500).json({ msg : "Failed Question Type Casting" });
    }
      incommingSurvey.questions = newQuestions;
    
    //---------------------------------------
    const options = { new: true, upsert: true }; 
    const survey = await Survey.findByIdAndUpdate( incommingSurvey._id , incommingSurvey,options);

    if(survey){
      return res.status(200).json({ msg : "Survey Saved",survey });
    }else {
      return res.status(404).json({ msg : "Item not found" });
    }
       
  } catch (error) {
    const r = await respFail(res,"failed to save","failedToSaveSurvey");
    return r;
  }
}


module.exports = updateSurvey;
