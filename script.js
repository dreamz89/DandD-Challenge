$(document).ready(function () {

  // randomise the class called by its index from 1 - 12
  var index = Math.floor((Math.random() * 10) + 3).toString()

  // get data from API
  $.get('http://www.dnd5eapi.co/api/classes/' + index).done(function (data) {
    console.log(data)
  })
})
