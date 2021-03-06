/*
 // Для добавления
 1. Вёрстка в шаблоне: Сделать ссылку "Добавить", в href - url добавления блюда
 2. Вёрстка в шаблоне: Написать разметку модального окна с формой (инпуты пустые), в action - url добавления блюда
 3. JS: событие на ссылке "Добавить"
    * поменять action формы на href ссылки "Добавить"
    * поменять заголовок модалки и текст на кнопке отправки формы
    * сбросить предыдущие действия submit на форме: $('#айди_формы').off('submit');
    * назначить на submit формы новое действие (вызов п. 4)
    * открыть модальное окно
 4. JS: событие на отправке формы в модальном окне - отправка AJAX-запроса
    * считать данные из input'ов формы
    * считать url из action формы
    * отправить ajax-запрос на url с указанными данными
 5. Представление Django: получение запроса в CreateView
 6. Представление Django: сохранить форму и вернуть ответ JsonResponse с данными нового объекта на успешный запрос из form_valid (без вызова super)
 7. Представление Django: вернуть ответ JsonResponse с ошибкой в form_invalid (без вызова super())
 8. urls.py: подключить новое представление на url для добавления блюда
 9. JS: обработка успешного ответа в функции success в AJAX-запросе (принимает response с данными и status)
    * Добавить в список блюд новый li, в котором выводятся пришедшие данные
    * Добавить в новый li ссылку "редактировать"
    * Повесить на нажатие новой ссылки "редактировать" действие из п.3 для редактирования
    * Добавить в новый li ссылка "удалить"
    * Повесить на нажатие новой ссылки "удалить" действие из п.3 для удаления
    * Спрятать модалку
 10. JS: обработка неуспешного ответа в функции error в AJAX-запросе (принимает response с сообщением об ошибке и status)
    * Вывести ошибку в модальном окне.


 // Для редактирования (модальное окно то же самое, что и для добавления, оно не меняется)
 1. Вёрстка в шаблоне: Сделать ссылку "Редактировать"
    * в href - url редактирования блюда
    * сохранить pk блюда в data-атрибуте pk этой ссылки
 2. Вёрстка в шаблоне: Присвоить уникальные id элементам, в которых выводятся данные блюд, включающие в себя pk блюда
 3. JS: событие на ссылке "Редактировать"
    * поменять action формы на href ссылки "Редактровать"
    * поменять заголовок модалки и текст на кнопке отправки формы
    * сбросить предыдущие действия submit на форме: $('#айди_формы').off('submit');
    * назначить на submit формы новое действие (вызов п. 4)
    * определить id элементов с данными блюда, используя data-атрибут c pk на нажатой ссылке ($(this)).
    * записать в input формы данные блюда из элементов с найденными id
    * открыть модальное окно
 4. JS: событие на отправке формы в модальном окне - отправка AJAX-запроса
    * считать данные из input'ов формы
    * считать url из action формы
    * отправить ajax-запрос на url с указанными данными
 5. Представление Django: получение запроса в UpdateView
 6. Представление Django: сохранить форму и вернуть ответ JsonResponse с данными нового объекта на успешный запрос из form_valid (без вызова super)
 7. Представление Django: вернуть ответ JsonResponse с ошибкой в form_invalid (без вызова super())
 8. urls.py: подключить новое представление на url для изменения блюда
 9. JS: обработка успешного ответа в функции success в AJAX-запросе (принимает response с данными и status)
    * определить id элементов с данными блюда, используя pk, который пришёл в json ответе.
    * Найти элементы, в которых выводятся данные блюда, по найденным id
    * заменить данные в найденных элементах на данные из json ответа (включая data-food_pk, необходимый для заполнения select в форме).
    * Спрятать модалку
 10. JS: обработка неуспешного ответа в функции error в AJAX-запросе (принимает response с сообщением об ошибке и status)
    * Вывести ошибку в модальном окне (спрятать предыдущую ошибку, если есть).


 // Для удаления (без подтверждения)
 1. Вёрстка в шаблоне: Сделать ссылку "Удалить"
    * в href - url удаления блюда
    * сохранить pk блюда в data-атрибуте pk этой ссылки
 2. Вёрстка в шаблоне: Присвоить уникальные id пунктам li, в которых выводятся данные блюд, включающие в себя pk блюда
 3. JS: событие на ссылке "Удалить"
    * считать url из href ссылки "Удалить"
    * отправить ajax-запрос на url с указанными данными
 4. Представление Django: получение запроса в DeleteView
    * переопределить метод delete (без вызова super())
    * найти в нём объект (метод self.get_object)
    * если найден, удалить его и вернуть ответ JsonResponse с pk удаленного объекта
    * если не найден, django сам выкинет Http404
 5. urls.py: подключить новое представление на url для удаления блюда
 6. JS: обработка успешного ответа в функции success в AJAX-запросе (принимает response с данными и status)
    * определить li с данными блюда, используя pk, который пришёл в json ответе.
    * удалить найденный li из DOM (разметки)
    * Спрятать модалку
 7. JS: обработка неуспешного ответа в функции error в AJAX-запросе (принимает response с сообщением об ошибке и status)
    * вывести сообщение об ошибке на странице и/или в консоли.
 */


// функция, которая обрабатывает успешный AJAX-запрос на добавление блюда
function onCreateSuccess(response, status) {
    // выводим содержимое ответа и статус в консоль.
    console.log(response);
    console.log(status);

    // создаём новый пункт списка блюд
    let newFoodLi = $('<li></li>');

    let foodNameSpan = $('<span></span>')
        .attr('id', 'order_food_name_' + response.pk)
        .data('food_pk', response.food_pk)
        .text(response.food_name)
    let foodAmountSpan = $('<span></span>')
        .attr('id', 'order_food_amount_' + response.pk)
        .text(response.amount);
    let editLink = $('<a></a>')
        .addClass('edit_link')
        .attr('href', response.edit_url)
        .data('pk', response.pk)
        .text('Изменить')
        .click(onOrderFoodUpdate);
    let deleteLink = $('<a></a>')
        .attr('href', '#')
        .text('Удалить');

    newFoodLi
        .attr('id', 'order_food_' + response.pk)
        .append(foodNameSpan)
        .append(': ')
        .append(foodAmountSpan)
        .append(' шт. (')
        .append(editLink)
        .append(' / ')
        .append(deleteLink)
        .append(')');

    // добавляем новый пункт в список
    $('#order_food_list').append(newFoodLi);

    // выключаем модальное окно
    $('#food_edit_modal').modal('hide');
}


// функция, которая обрабатывает успешный AJAX-запрос на изменение блюда
function onUpdateSuccess(response, status) {
    // выводим содержимое ответа и статус в консоль.
    console.log(response);
    console.log(status);

    // находим нужное блюдо на странице и меняем его данные на новые, пришедшие в ответе
    let pk = response['pk'];
    let food_name_span = $('#order_food_name_' + pk);
    food_name_span.text(response.food_name);
    food_name_span.data('food_pk', response.food_pk);
    $('#order_food_amount_' + pk).text(response.amount);

    // прячем модалку
    $('#food_edit_modal').modal('hide');
}


// функция, которая обрабатывает неуспешный AJAX-запрос
// и на добавление, и на изменение блюда
function onFormSubmitError(response, status) {
    // выводим содержимое ответа и статус в консоль.
    console.log(response);
    console.log(status);

    // если ответ содержит ключ errors,
    // выводим его содержимое в специальный div в модалке
    if (response.errors) {
        $('#food_form_errors').text(response.errors.toString());
    }
}


// функция, которая отправляет AJAX-запрос с формой
// и вызывает переданную функцию в случае успеха
function orderFoodFormSubmit(success) {
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
        success: success,
        error: onFormSubmitError
    });
}


// Обработка клика по ссылке "Добавить"
function onOrderFoodCreate(event) {
    event.preventDefault();

    // меняем заголовок и текст на кнопке "Добавить" в модалке
    $("#food_edit_modal .modal-title").text('Добавить блюдо');
    $("#food_submit").text('Добавить');

    // меняем action в форме в модалке на url,
    // указанный в href нажатой ссылки на добавление.
    // this в обработчиках событий указывает на тот объект,
    // к которому привязано событие, в данному случае -
    // на ту ссылку, которая была нажата.
    let foodForm = $('#food_form');
    foodForm.attr('action', $(this).attr('href'));

    // сбрасываем данные в форме редактирования блюда в модалке на пустые значения
    $('#id_food').val('');
    $('#id_amount').val('');

    // отключаем предыдущие обработчики события отправки формы
    foodForm.off('submit');

    // назначаем действие на отправку формы food_form.
    foodForm.on('submit', function (e) {
        // отменить обычную отправку формы (действие по умолчанию с перезагрузкой страницы)
        e.preventDefault();

        // отправить форму с помощью функции orderFoodFormSubmit, которая использует AJAX-запрос.
        // в случае успеха вызвать функцию onCreateSuccess
        orderFoodFormSubmit(onCreateSuccess);
    });

    // показываем модалку на экране
    $('#food_edit_modal').modal('show');
}


// Обработка клика по ссылке "Изменить"
function onOrderFoodUpdate(event) {
    // отменяем действие по умолчанию (переход по ссылке)
    event.preventDefault();

    // меняем заголовок и текст на кнопке "Добавить" в модалке
    $("#food_edit_modal .modal-title").text('Изменить блюдо');
    $("#food_submit").text('Изменить');

    // меняем action в форме в модалке на url,
    // указанный в href нажатой ссылки на редактирование.
    // this в обработчиках событий указывает на тот объект,
    // к которому привязано событие, в данном случае -
    // на ту ссылку, которая была нажата.
    let foodForm = $('#food_form');
    foodForm.attr('action', $(this).attr('href'));

    // находим элементы с именем блюда и количеством блюда на странице,
    // используя свойство data-pk нажатой ссылки.
    let foodPk = $(this).data('pk');
    let foodName = $('#order_food_name_' + foodPk);  // '#order_food_name_1'
    let foodAmount = $('#order_food_amount_' + foodPk);  // '#order_food_amount_1'

    // задаём в форме исходные значения для данного блюда в заказе.
    // т.к. на странице выводится название блюда, а нам нужен его pk,
    // pk сохраняем и получаем через data-атрибут food_pk.
    $('#id_food').val(foodName.data('food_pk'));
    $('#id_amount').val(foodAmount.text());

    // отключаем предыдущие обработчики события отправки формы
    foodForm.off('submit');

    // задаём обработчик события отправки формы
    foodForm.submit(function (event) {
        // отменяем действие по умолчанию (обычная отправка формы)
        event.preventDefault();

        // отправить форму с помощью функции orderFoodFormSubmit, которая использует AJAX-запрос.
        // в случае успеха вызвать функцию onUpdateSuccess
        orderFoodFormSubmit(onUpdateSuccess);
    });

    // показываем модалку на экране.
    $('#food_edit_modal').modal('show');
}


// настраиваем создание и изменение блюд
// через AJAX после загрузки страницы.
window.addEventListener('load', function () {
    // назначаем действие на нажатие кнопки "Добавить" в модалке.
    // кнопка не находится внутри формы, поэтому её требуется настроить здесь.
    $('#food_submit').on('click', function (e) {
        // отправляем форму
        $('#food_form').submit();
    });

    // настраиваем создание блюд по клику на ссылку "Добавить"
    $("#order_food_add_link").click(onOrderFoodCreate);

    // настраиваем изменение блюд по клику на ссылки "Изменить"
    $('#order_food_list .edit_link').click(onOrderFoodUpdate);
});
