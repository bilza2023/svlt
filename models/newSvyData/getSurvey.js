

 
function getSurvey(user_id, incomming_title = "New Test") {
   const svy = { 
        userId : user_id,
        title : incomming_title,
        saveResponse : false,
        showIntro : true,
        introText : "Welcome",
        published : false,
        showResult : true,
        showfarewellText : true,
        farewellText : "Goodbye",
        members : [{email : 'aaa@msn.com', password : '12345'}],
        questions : []
   }
 return svy;   
}


module.exports = getSurvey;
