from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('post/todo', views.postTodo, name='postTodo'),
	path('edit/todo', views.editTodo, name='editTodo'),
	path('delete/todo', views.deleteTodo, name='deleteTodo')
]