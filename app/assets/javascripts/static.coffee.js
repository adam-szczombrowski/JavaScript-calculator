var on = false;
var calculated = false;
var numbers = [];
var operations = [];
function turnOnOff(){
  if (on == false)
  {
    $('.result p').text("0");
    on = true;
  }
  else
  {
    $('.result p').text("");
    on = false;
    operations.length = 0;
    numbers.length = 0;
  }
}
function clr(){
  $('.result p').text("0");
}
function display(button){
  var chars = {"zero": "0","one" : "1", "two" : "2", "three" : "3", "four": "4", "five":"5", "six":"6", "seven":"7", "eight":"8","nine":"9","dot":"."};
  var id = button.attr('id');
  var result = $('.result p').text();
  if (calculated == true)
    {
    $('.result p').text(chars[id]);
    calculated = false;
    }
  else if (result == "0" && id == "zero")
    {}
  else if (result == "0" && id != "dot")
    $('.result p').text(chars[id]);
  else if (id == "dot" && result.includes("."))
    {}
  else
    $('.result p').text(result + chars[id]);
}
function operate(button){
  var operands = {"plus" : "+", "minus": "-", "percent" : "%", "division" : "/", "times" : "*" };
  numbers.push($('.result p').text().match(/[0-9.,]+$/).join(''));
  operations.push(button.attr('id'));
  $('.result p').text(operands[button.attr('id')]);
}
function calc(){
  numbers.push($('.result p').text().match(/[0-9.,]+$/).join(''));
  console.log("numbers: " + numbers.length);
  console.log("op: " + operations.length);
  if (numbers.length - 1 == operations.length)
    {
      var res = parseFloat(numbers[0]);
      for(var i = 0; i <numbers.length - 1; i++)
        {
          console.log(operations[i]);
          switch(operations[i]){
            case "plus":
              console.log("dzieje się dodawanie");
              res += parseFloat(numbers[i+1]);
              break;
            case "minus":
              console.log("dzieje się odejmowanie");
              res -= parseFloat(numbers[i+1]);
              break;
            case "percent":
              res %= parseFloat(numbers[i+1]);
              break;
            case "division":
              res /= parseFloat(numbers[i+1]);
              break;
            case "times":
              res *= parseFloat(numbers[i+1]);
              break;
          }
        }
      console.log("result: " + res);
      $('.result p').text(res);
      operations.length = 0;
      numbers.length = 0;
      calculated = true;
    }
  else
    {
    alert("Niepoprawna liczba operacji");
    numbers.length = 0;
    operations.length = 0;
    }
}
function checkDisplay(){
  if ($('.result p').text().length > 9)
    {
    var proper = $('.result p').text().slice(0,9);
      $('.result p').text(proper);
      alert("Too many numbers for this display!");
    }
}
$(document).ready(function(){
    $('#ac').click(function(){
      turnOnOff();
    });
    $('#clear').click(function(){
      if (on == true)
        clr();
    });
    $('.num').click(function(){
      if (on == true)
        display($(this));
        checkDisplay();
    });
    $('.op').click(function(){
      if (on == true)
        operate($(this));
    });
    $('#equals').click(function(){
      if (on == true)
        calc();
        checkDisplay();
    });
});
