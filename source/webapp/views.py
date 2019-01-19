from django.views.generic import DetailView, CreateView, UpdateView, View, DeleteView, FormView
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse
from webapp.models import Food, Order, OrderFood
from webapp.forms import FoodForm, OrderForm, OrderFoodForm
from django.shortcuts import get_object_or_404


class FoodDetailView(DetailView):
    model = Food
    template_name = 'food_detail.html'


class FoodCreateView(CreateView):
    model = Food
    template_name = 'food_create.html'
    form_class = FoodForm

    def get_success_url(self):
        return reverse('food_detail', kwargs={'pk': self.object.pk})


class FoodDetailSessionView(DetailView):
    model = Food
    template_name = 'food_detail.html'

    def get_object(self, queryset=None):
        # достаём из сессии значение для ключа food_pk
        food_pk = self.request.session.get('food_pk')
        food = get_object_or_404(self.model, pk=food_pk)
        # удаляем из сессии значение для ключа food_pk
        self.request.session.pop('food_pk')
        return food


class FoodCreateSessionView(CreateView):
    model = Food
    template_name = 'food_session_create.html'
    form_class = FoodForm

    def form_valid(self, form):
        response = super().form_valid(form)
        # сохраняем ключ только что созданного объекта Food
        # в сессию с ключом food_pk
        self.request.session['food_pk'] = self.object.pk
        return response

    def get_success_url(self):
        return reverse('food_session_detail')


class OrderDetailView(DetailView, FormView):
    model = Order
    template_name = 'order_detail.html'
    form_class = OrderFoodForm


class OrderFoodAjaxCreateView(CreateView):
    model = OrderFood
    form_class = OrderFoodForm

    # обработка формы без ошибок
    def form_valid(self, form):
        order = get_object_or_404(Order, pk=self.kwargs.get('pk'))
        form.instance.order = order
        order_food = form.save()
        return JsonResponse({
            'food_name': order_food.food.name,
            'food_pk': order_food.food.pk,
            'amount': order_food.amount,
            'pk': order_food.pk,
            'edit_url': reverse('order_food_update', kwargs={'pk': order_food.pk})
        })

    # обработка формы с ошибками
    # статус 422 - UnprocessableEntity, применяется,
    # когда запрос имеет корректный формат,
    # но неподходящие по смыслу данные (например, пустые).
    def form_invalid(self, form):
        return JsonResponse({
            'errors': form.errors
        }, status='422')


class OrderFoodAjaxUpdateView(UpdateView):
    model = OrderFood
    form_class = OrderFoodForm

    def form_valid(self, form):
        order_food = form.save()
        return JsonResponse({
            'food_name': order_food.food.name,
            'food_pk': order_food.food.pk,
            'amount': order_food.amount,
            'pk': order_food.pk
        })

    def form_invalid(self, form):
        return JsonResponse({
            'errors': form.errors
        }, status='422')


class OrderUpdateView(UpdateView):
    model = Order
    template_name = 'order_update.html'
    form_class = OrderForm

    def get_success_url(self):
        return reverse('order_detail', kwargs={'pk': self.object.pk})


# Варианты представления для курьеров (взять заказ/доставить заказ)
# (в коде оставьте один)
# обычное - представление-функция
def order_deliver_view(request, *args, **kwargs):
    # найти заказ
    # если статус "Готовится", то
        # поменять статус на "В пути"
    # если статус "В пути", то
        # поменять статус на "Доставлено"
    # сохранить заказ
    # сделать редирект на список заказов
    pass


# классовое на базе View
class OrderDeliverView(View):
    def get(self, *args, **kwargs):
        # найти заказ
        # если статус "Готовится", то
            # поменять статус на "В пути"
        # если статус "В пути", то
            # поменять статус на "Доставлено"
        # сохранить заказ
        # сделать редирект на список заказов
        pass


# Варианты представления для отмены заказов
# (в коде оставьте один)
# обычное - представление-функция
def order_reject_view(request, *args, **kwargs):
    # найти заказ
    # поменять статус на canceled
    # сохранить заказ
    # сделать редирект на список заказов
    pass


# классовое на базе View
class OrderRejectView(View):
    def get(self, *args, **kwargs):
        # найти заказ
        # поменять статус на canceled
        # сохранить заказ
        # сделать редирект на список заказов
        pass


# классовое на базе DeleteView с выводом страницы подтверждения
class OrderRejectViewV2(DeleteView):
    model = OrderUpdateView
    template_name = 'order_cancel.html'

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        success_url = self.get_success_url()
        # поменять статус на canceled
        # сохранить заказ
        return HttpResponseRedirect(success_url)


# Представления для создания заказа
class OrderCreateView(CreateView):
    model = Order
    template_name = 'order_create.html'
    form_class = OrderForm

    def get_success_url(self):
        return reverse('order_detail', kwargs={'pk': self.object.pk})


# ... и для добавления блюд в заказ
class OrderFoodCreateView(CreateView):
    model = OrderFood
    form_class = OrderFoodForm
    template_name = 'order_food_create.html'

    def get_success_url(self):
        return reverse('order_detail', kwargs={'pk': self.object.order.pk})

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['order'] = Order.objects.get(pk=self.kwargs.get('pk'))
        return context

    # Здесь нужен метод get_form_valid, который будет добавлять
    # в объект OrderFood из формы ссылку на заказ
    # по примеру из вебинара для бонуса в дз #43.


class OrderFoodDeleteView(DeleteView):
    # Доработайте это представление (удаление блюда из заказа).
    # В шаблоне вы также не должны выводить форму, как и в order_food_create.html
    # Если статус заказа - доставлен или в пути

    model = OrderFood
