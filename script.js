$(document).ready(function () {

  // randomise the class called by its index from 1 - 12
  var index = Math.floor(Math.random() * 11 + 1).toString()

  // get data from API
  $.get('http://www.dnd5eapi.co/api/classes/' + index).done(function (data) {
    console.log(data)
    var charac = ''
    switch (data.index) {
      case 1:
        charac = 'images/01Barbarian.jpg'
        break
      case 2:
        charac = 'images/02Bard.jpg'
        break
      case 3:
        charac = 'images/03Cleric.jpg'
        break
      case 4:
        charac = 'images/04Druid.jpg'
        break
      case 5:
        charac = 'images/05Fighter.jpg'
        break
      case 6:
        charac = 'images/06Monk.jpg'
        break
      case 7:
        charac = 'images/07Paladin.jpg'
        break
      case 8:
        charac = 'images/08Ranger.jpg'
        break
      case 9:
        charac = 'images/09Rogue.jpg'
        break
      case 10:
        charac = 'images/10Sorcerer.jpg'
        break
      case 11:
        charac = 'images/11Warlock.jpg'
        break
      case 12:
        charac = 'images/12Wizard.jpg'
        break
    }
    var $newImg = $('<img>')
    $newImg.attr('src', charac)
    $('.header').append($newImg)
  })
})
