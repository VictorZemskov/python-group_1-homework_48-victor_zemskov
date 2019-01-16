// функция, которая обрабатывает успешный AJAX-запрос
function addOrderFoodSuccess(response, status) {
    // выводим содержимое ответа и статус в консоль.
    console.log(response);
    console.log(status);

    // создаём новый пункт списка блюд
    let newFoodLi = document.createElement('li');

    // заполняем новый пункт списка блюд разметкой - текстом и ссылками
    // т.к. ответ - это JSON-объект,
    // то с ним можно работать, как с объектом JS,
    // и обращаться к его свойствам через точку.
    // используем форматированную строку,
    // которая обозначается апострофами (``)
    // и позволяет подставлять в неё переменные через ${}.
    $(newFoodLi).html(
        `${response.food_name}: ${response.amount}шт. (<a href="#">Изменить</a> / <a href="#">Удалить</a>)`
    );

    // добавляем новый пункт в список
    $('#order_food_list').append(newFoodLi);

    // выключаем модальное окно
    $('#food_edit_modal').modal('toggle');
}

// функция, которая обрабатывает неуспешный AJAX-запрос
function submitOrderFoodError(response, status) {
    // выводим содержимое ответа и статус в консоль.
    console.log(response);
    console.log(status);
}

// функция, которая отправляет AJAX-запрос с формой
// по клику на кнопку "Добавить"
function addOrderFood() {
    // определяем url для отправки формы food_form по её свойству action:
    let url = $('#food_form').attr('action');

    // собираем данные, указанные в форме food_form
    let data = {
        food: $('#id_food').val(),
        amount: $('#id_amount').val(),
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
    };

    // отправляем данные
    // опции success и error должны быть функциями,
    // которые jQuery вызовет при успешной и неуспешной отправке запроса, соответственно
    // (т.н. "колбэки" - "callback" - функции обратной связи).
    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        success: addOrderFoodSuccess,
        error: submitOrderFoodError
    });
}

function orderFoodCreateSetup() {
    // назначаем действие на нажатие кнопки "Добавить" в модалке.
    $('#food_submit').on('click', function (e) {
        // отправляем форму
        $('#food_form').submit();
    });

    // отключаем предыдущие обработчики события отправки формы
    let foodForm = $('#food_form');
    foodForm.off('submit');

    // назначаем действие на отправку формы food_form.
    foodForm.on('submit', function (e) {
        // отменить обычную отправку формы (действие по умолчанию с перезагрузкой страницы)
        e.preventDefault();
        // отправить форму с помощью функции addOrderFood, которая использует AJAX-запрос.
        addOrderFood();
    });
}


/* Настройка обновления блюд в заказе через AJAX-запросы */
/* после завершения работы над изменением блюд в заказе через AJAX
 * нужно дополнить код по созданию блюд через AJAX: по клику на ссылку "Добавить"
 * он должен возвращать action формы к исходному (url из href кнопки "Добавить",
 * ведущий на order_food_create), сбрасывать данные в полях формы
 * (устанавливать пустые значения) и обратно менять обработчик события отправки формы
 * на AJAX-запрос на добавление блюда в заказ. */
function orderFoodUpdateSetup() {
    $('#order_food_list .edit_link').click(function(event) {
        // отменяем действие по умолчанию (переход по ссылке)
        event.preventDefault();

        // меняем action в форме в модалке на url,
        // указанный в href нажатой ссылки на редактирование.
        // this в обработчиках событий указывает на тот объект,
        // к которому привязано событие, в данному случае -
        // на ту ссылку, которая была нажата.
        let foodForm = $('#food_form');
        foodForm.attr('action', $(this).attr('href'));

        // находим элементы с именем блюда и количеством блюда на странице,
        // используя свойство data-pk нажатой ссылки.
        let foodPk = $(this).data('pk');
        let foodName = $('#order_food_' + foodPk + ' .food_name');  // '#order_food_1 .food_name'
        let foodAmount = $('#order_food_' + foodPk + ' .food_amount');  // '#order_food_1 .food_amount'

        // задаём в форме исходные значения для данного блюда в заказе.
        // т.к. на странице выводится название блюда, а нам нужен его pk,
        // pk сохраняем и получаем через data-атрибут food_pk.
        $('#id_food').val(foodName.data('food_pk'));
        $('#id_amount').val(foodAmount.text());

        // отключаем предыдущие обработчики события отправки формы
        foodForm.off('submit');

        // задаём обработчик события отправки формы
        foodForm.submit(function(event) {
            // отменяем действие по умолчанию (обычная отправка формы)
            event.preventDefault();

            // напишите здесь AJAX-запрос к OrderFoodUpdateView

        });

        // показываем модалку на экране.
        $('#food_edit_modal').modal('show')
    })
}


// настраиваем создание и изменение блюд
// через AJAX после загрузки страницы.
window.onload = function() {
    orderFoodCreateSetup();
    orderFoodUpdateSetup();
};
