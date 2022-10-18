window.onload = showQ;
//  make a function to show each quiz on next button
var i = 0;
function showQ(){
//  first store all li tags in a veriable
  var ul = document.getElementsByTagName('ul')[0];
  var li = ul.getElementsByTagName('li');
  for(var j = 0; j<= li.length-1; j++){
//    first we need to show only 1 li tag then
    if(i == j){
      li[j].style.display = 'block';
      // now get the answer value from li tag and store it in button as true or false
      var ans = li[j].getAttribute('answer-number');
      var btn = li[j].getElementsByTagName('button');
      for(var k = 0; k <= btn.length-1; k++){
        if(k+1 == ans){
          // if it match to the answer, then it is true otherwise false
          btn[k].setAttribute('answer', true);
          // also make a function for clicking answer button
          btn[k].setAttribute('onClick', "clickAns("+i+", this)");
          // we will make a function clickAns later and pass parameter of i and this
        }else{
          btn[k].setAttribute('answer', false);
          btn[k].setAttribute('onClick', "clickAns("+i+", this)");
        }
      }
    }else{
      li[j].style.display = 'none';
    }
  }
  document.getElementsByClassName('total-q')[0].innerHTML = i+1 + "/" + li.length;
  document.getElementsByClassName('progress-bar')[0].style.width = (i/li.length)*100 + '%';
  // we need to increase the value of i on each time function run to show next question
  if(i == li.length-1){
    i = 0;
    // on last question show get result button
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("result").style.display = 'block';
    document.getElementsByClassName('timeout')[0].setAttribute('show-result', 'true')
  }else{
    i++;
  }
  // disable show next question button until not answered
  document.getElementById("showQ").disabled = true;
  // now make a timeout
  // test it
  document.getElementsByClassName('timeout')[0].setAttribute('data-remain', 30);
}
setInterval(function(){
  // this function will get data-remain value and decrease by 1 and add to data-remain again after 1 second
  var dataContainer = document.getElementsByClassName('timeout')[0];
  var getData = dataContainer.getAttribute('data-remain');
  // if answer is last then don't show first answer just show result
  var showResult = dataContainer.getAttribute('show-result');
  // but we need to set this attribute on last question
  if(getData >= 0){
    try{document.querySelector('.timeout span').innerHTML = getData}catch{};
      getData--;
      dataContainer.setAttribute('data-remain', getData);
  }else{
    // now if last question
    if(showResult == 'true'){
      document.getElementById('result').click();
    }else{
        // if getData is less than 0
        // then show next answer
        showQ();
    }
  }
}, 1000);
// now make a function for answer
function clickAns(i, e){
  var ul = document.getElementsByTagName('ul')[0];
  var li = ul.getElementsByTagName('li');
  var btn = li[i].getElementsByTagName('button');
  // get the answer form the button 
  var v = e.getAttribute('answer');
  for(var j = 0; j <= btn.length-1; j++){
    if(v == 'true'){
      // if answer is true
      e.className = 'correct';
      result(false);
    }else{
      e.className = 'wrong';
      //first make both class in css
      // also show correct answer after wrong clicked
      for(var k = 0; k <= btn.length-1; k++){
//        we only need the show correct ans
        if(btn[k].getAttribute('answer') == 'true'){
          btn[k].className = 'correct';
        }
        
      }
    }
    // disable button after first click
    btn[j].disabled = true;
  }
  // also enable next question button after click
  document.getElementById("showQ").disabled = false;
}
// now get the result
var numPerQ = 5;
var correctAns = 0;
  // we run the function from two side 1 just add correct answer number and 2 will show answer
function result(showAns){
var ul = document.getElementsByTagName('ul')[0];
  var li = ul.getElementsByTagName('li');
  if(showAns == false){
    // it will add answer
    correctAns++;
  }else{
    // it will show result
    var result = (correctAns/4)*numPerQ;
    var totalNumb = li.length*numPerQ;
    document.getElementsByClassName('timeout')[0].innerHTML = 'Result is: ' + result + '/' + totalNumb;
    document.getElementsByClassName('progress-bar')[0].style.width = 'calc(100% - 3px)';
  }
}