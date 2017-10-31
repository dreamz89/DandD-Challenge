$(document).ready(function () {

  // randomise the class called by its index from 1 - 12
  var index = Math.floor(Math.random() * 11 + 1).toString()

  // get data from API
  $.get('http://www.dnd5eapi.co/api/classes/' + index).done(function (data) {
    console.log(data)
    var charac = ''
    var title = ''
    switch (data.index) {
      case 1:
        charac = 'images/01Barbarian.jpg'
        title = 'Barbarian'
        break
      case 2:
        charac = 'images/02Bard.jpg'
        title = 'Bard'
        break
      case 3:
        charac = 'images/03Cleric.jpg'
        title = 'Cleric'
        break
      case 4:
        charac = 'images/04Druid.jpg'
        title = 'Druid'
        break
      case 5:
        charac = 'images/05Fighter.jpg'
        title = 'Fighter'
        break
      case 6:
        charac = 'images/06Monk.jpg'
        title = 'Monk'
        break
      case 7:
        charac = 'images/07Paladin.jpg'
        title = 'Paladin'
        break
      case 8:
        charac = 'images/08Ranger.jpg'
        title = 'Ranger'
        break
      case 9:
        charac = 'images/09Rogue.jpg'
        title = 'Rogue'
        break
      case 10:
        charac = 'images/10Sorcerer.jpg'
        title = 'Sorcerer'
        break
      case 11:
        charac = 'images/11Warlock.jpg'
        title = 'Warlock'
        break
      case 12:
        charac = 'images/12Wizard.jpg'
        title = 'Wizard'
        break
    }
    // change title class according to data
    var t = document.createTextNode(title)
    $('.ttitle').append(t)

    // change class picture according to data
    $('.charac').attr('src', charac)

    // add proficiencies hit die
    var hd = document.createTextNode(data.hit_die)
    $('.hd').append(hd)

    // add proficiencies proficiencies
    for (var i = 0; i < data.proficiencies.length; i++) {
      var pf = document.createTextNode(data.proficiencies[i].name)
      $('.pf1').append(pf).append($('<br>'))
    }
  })
})
