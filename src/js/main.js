//= jquery.min.js
//= jquery.maskedinput.min.js
//= owl.carousel.min.js

function initCarousel() {
  console.log($(document).width(), 2)

  if ($(document).width() < 560) {
    $('.dishes-carousel').owlCarousel({
      loop: true,
      margin: 10,
      items: 1
    })
  }
}

function scrollTo(selector) {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(selector).offset().top
    },
    500
  )
}

function initStopPropogation() {
  $('.stopPropagation').click(function(event) {
    event.stopPropagation()
  })
}

function initRationDays() {
  let curDate = new Date()

  for (let i = 0; i < 6; i++) {
    let day = curDate.getDate()

    curDate.setDate(day + 1)

    $('.ration-menu__dates').append(
      `<span data-ration-num-trigger="${i +
        1}">${curDate.getDate()}.${curDate.getMonth() + 1}</span>`
    )
  }

  $('.ration-menu__dates span').click(function() {
    let rationNum = $(this).attr('data-ration-num-trigger')
    $(this)
      .siblings()
      .removeClass('active')
    $(this).addClass('active')

    $(`.ration-menu__dishes-wrapper`).removeClass('active')
    $(`[data-ration-num=${rationNum}]`).addClass('active')
  })
}

function initModal() {
  $('#showModal').click(function() {
    $('#modal').addClass('active')
  })

  $('#closeModal, #modal').click(function() {
    $('#modal').removeClass('active')
  })
}

function initRation() {
  $('[data-order-name]').click(function() {
    scrollTo('.ration')

    $('#rationName').text($(this).attr('data-order-name'))
    $('#rationInfo').text($(this).attr('data-order-kkal') || '')

    $('#orderName').val($(this).attr('data-order-name'))
  })

  $('.ration__plan-item').click(function() {
    $(this)
      .siblings()
      .removeClass('active')
    $(this).addClass('active')

    let price = $(this).attr('data-plan-price')
    let days = $(this).attr('data-plan-days')

    $('#orderSum').text(price)
    $('#orderPrice').val(price)
    $('#orderDays').val(days)
  })
}

function initQuestions() {
  $('.questions__item h4').click(function() {
    $(this)
      .siblings('p')
      .fadeToggle(200)

    $(this)
      .find('img')
      .toggle()
  })
}

function initForm() {
  $('input[name="orderCustomerPhone"]').mask('+7 (999) 999-99-99')

  $('.sumbitForm').click(function() {
    let theForm = $(this).closest('form')
    if (!(theForm.find('input[name="orderCustomerPhone"]').val().length > 0)) {
      theForm.find('.announce-block').text('Необходимо ввести номер телефона')
      return false
    }

    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: theForm.serialize()
    })
      .done(function() {
        theForm.find('.announce-block').text('Сообщение успешно отправлено!')
        theForm.find('#sumbitForm').hide()
      })
      .fail(function() {
        theForm
          .find('.announce-block')
          .text(
            'При отправке сообщения возникла ошибка. Пожалуйста, свяжитесь с нами по телефону: 8 (999) 220-35-35'
          )
      })

    return false
  })
}

$(document).ready(function() {
  initStopPropogation()
  initRationDays()
  initModal()
  initRation()
  initForm()
  initQuestions()
  initCarousel()
})
