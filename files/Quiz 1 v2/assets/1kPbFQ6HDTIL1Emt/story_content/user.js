window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  // Get the current date
var currentDate = new Date();

// Format the date (you can customize this format)
var formattedDate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

// Send the formatted date to Storyline variable
var player = GetPlayer();
player.SetVar("currentDate", formattedDate);

}

};
