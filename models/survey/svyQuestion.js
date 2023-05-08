
const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };


///////////////////////////////////
const svyQuestionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: true,
    default : false
  },
  content: {
    type: String,
    required: false
  },
  explanation: {
    type: String,
    required: false
  },
  backendType: {
    type: String,
    enum: [ 'SurveyMCQ' , 'SurveyInput' ,'SurveyParagraph' , 'SurveyNumber' ,'SurveyUrl' , 'SurveyPassword' , 'SurveyEmail' ],
    required: true,
  }
});
const SurveyQuestion  = mongoose.model('SurveyQuestion', svyQuestionSchema);


///////////////////////////////////--MCQ--////////////////////////
//---Options schema for MCQ
const optionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});

//..

const SurveyMCQ = SurveyQuestion.discriminator('SurveyMCQ',
  new mongoose.Schema({ 
        multiSelect: {
          type: Boolean,
          required: false,
          default : false
        },
        selectedOptions: {
          type: [String],
          required: true,
          default : []
        },
        displayOptions: {
          type: String,
          enum: ["dropdown", "radio", "check" , "bars"],
          required: true,
          default : "bars"
        },
        options: {
          type: [optionSchema],
          required: true
        }
  })
  , options);

///////////////////////////////////--Input --////////////////////////

const SurveyInput = SurveyQuestion.discriminator('SurveyInput',
  new mongoose.Schema({ 
        payload: {
          type: String,
          required: false,
          default: "",
        },
        minChar: {
          type: Number,
          required: false,
          default : 0
        },
        maxChar: {
          type: Number,
          required: false,
          default : 0
        },
  })
  , options);

///////////////////////////////////--Paragrapg --////////////////////////

const SurveyParagraph = SurveyQuestion.discriminator('SurveyParagraph',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        },
        minChar: {
          type: Number,
          required: false,
          default : 0
        },
        maxChar: {
          type: Number,
          required: false,
          default : 0
        },
  })
  , options);

///////////////////////////////////--Number --////////////////////////

const SurveyNumber = SurveyQuestion.discriminator('SurveyNumber',
  new mongoose.Schema({ 
        payload: {
        type: Number,
          required: false
        },
        minVal: {
          type: Number,
          required: false,
          default : 0
        },
        maxVal: {
          type: Number,
          required: false,
          default : 0
        },
  })
  , options);

///////////////////////////////////--Url --////////////////////////

const SurveyUrl = SurveyQuestion.discriminator('SurveyUrl',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        },
        minVal: {
          type: Number,
          required: false,
          default : 0
        },
        maxVal: {
          type: Number,
          required: false,
          default : 0
        },
  })
  , options);

///////////////////////////////////--email --////////////////////////

const SurveyEmail = SurveyQuestion.discriminator('SurveyEmail',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        },
        validateAtFrontEnd: {
          type: Boolean,
          default : true,
        }
  })
  , options);

///////////////////////////////////--password --////////////////////////

const SurveyPassword = SurveyQuestion.discriminator('SurveyPassword',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        }
  })
  , options);


//..Export section
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//SurveyQuestion dont export since its abstract
module.exports = {svyQuestionSchema,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail};
