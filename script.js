  // randomise the class called by its index from 1 - 12
  var index = Math.floor(Math.random() * 11 + 1).toString()

  // get data from API
  $.get('https://www.dnd5eapi.co/api/classes/' + index + '/').done(function (data) {
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
      $('.pf1').append(pf)
      if (i < data.proficiencies.length - 1) {
        $('.pf1').append(', ')
      }
    }

    // add proficiency choices
    if (data.index !== 6) {
      for (var j = 0; j < data.proficiency_choices.length; j++) {
        var choiceNum = document.createTextNode('(Choose ' + data.proficiency_choices[j].choose + ' from) ')
        $('.pf2').append($('<p>')).append(choiceNum)
        for (var k = 0; k < data.proficiency_choices[j].from.length; k++) {
          if ((data.proficiency_choices[j].from[k].name).includes('Skill')) {
            var pc = document.createTextNode(data.proficiency_choices[j].from[k].name.substring(7))
          } else {
            pc = document.createTextNode(data.proficiency_choices[j].from[k].name)
          }
          $('.pf2').append(pc)
          if (k < data.proficiency_choices[j].from.length - 1) {
            $('.pf2').append(', ')
          }
        }
        $('.pf2').append($('</p>'))
      }
    } else { // for the Monk
      for (var n = 0; n < data.proficiency_choices[0].from.length; n++) {
        choiceNum = document.createTextNode('(Choose ' + data.proficiency_choices[0].from[n].choose + ' from) ')
        $('.pf2').append($('<p>')).append(choiceNum)
        for (var o = 0; o < data.proficiency_choices[0].from[n].from.length; o++) {
          pc = document.createTextNode(data.proficiency_choices[0].from[n].from[o].name)
          $('.pf2').append(pc)
          if (o < data.proficiency_choices[0].from[n].from.length - 1) {
            $('.pf2').append(', ')
          }
        }
        $('.pf2').append($('</p>'))
      }
      choiceNum = document.createTextNode('(Choose ' + data.proficiency_choices[1].choose + ' from) ')
      $('.pf2').append($('<p>')).append(choiceNum)
      for (var p = 0; p < data.proficiency_choices[1].from.length; p++) {
        pc = document.createTextNode(data.proficiency_choices[1].from[p].name)
        $('.pf2').append(pc)
        if (p < data.proficiency_choices[1].from.length - 1) {
          $('.pf2').append(', ')
        }
      }
      $('.pf2').append($('</p>'))
    }

    // equipment section
    $.get(data.starting_equipment.url).done(function (eqdata) {
      if (eqdata.starting_equipment.length === 0) { // for fighter
        var quantity = document.createTextNode('None')
        $('.eq1').append(quantity)
      } else {
        for (var q = 0; q < eqdata.starting_equipment.length; q++) {
          quantity = document.createTextNode(eqdata.starting_equipment[q].quantity + ' ' + eqdata.starting_equipment[q].item.name)
          $('.eq1').append(quantity)
          if (q < eqdata.starting_equipment.length - 1) {
            $('.eq1').append(', ')
          }
        }
      }
      var r = 1
      while (r <= eqdata.choices_to_make) {
        eval('var choices=' + 'eqdata.choice_' + r)
        var eqc = document.createTextNode('Choice ' + r + ': ')
        $('.eq1').append($('<p>')).append(eqc)
        for (var s = 0; s < choices.length; s++) {
          var eqquant = document.createTextNode(choices[s].from[0].quantity + ' ' + choices[s].from[0].item.name)
          $('.eq1').append(eqquant)
          if (s < choices.length - 1) {
            $('.eq1').append(', ')
          }
        }
        $('.eq1').append($('</p>'))
        r++
      }
    })

    // spells section (accomodate those who dont have spells)
    if (data.spellcasting) {
      $.get(data.spellcasting.url).done(function (spdata) {
        for (var m = 0; m < spdata.info.length; m++) {
          var spName = document.createTextNode(spdata.info[m].name)
          $('.spells .text').append($('<p>')).append(spName).append($('</p>'))
          var spDesc = document.createTextNode(spdata.info[m].desc[0])
          $('.spells .text').append($('<p>')).append(spDesc).append($('</p>'))
        }
      })
    } else {
      $('.spells').attr('style', 'display: none')
    }

    // subclass section
    var sc = document.createTextNode(data.subclasses[0].name)
    $('.subclassName').append(sc)
    $.get(data.subclasses[0].url).done(function (scdata) {
      var scf = document.createTextNode(scdata.subclass_flavor)
      $('.flavor').append(scf)
      var scd = document.createTextNode(scdata.desc)
      $('.desc').append(scd)
    })
  })
