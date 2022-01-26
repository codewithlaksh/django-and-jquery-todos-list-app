from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Todo

# Create your views here.
def index(request):
	todos = Todo.objects.all()
	context = {'todos': todos}
	return render(request, "index.html", context)

def postTodo(request):
	if request.method == "POST":
		description = request.POST["description"];
		sno = request.POST["snoEdit"];

		if len(description) == 0:
			return JsonResponse({"msg_status": "error", "message": "Please add some description for your todo!"})
		elif len(description) < 10:
			return JsonResponse({"msg_status": "error", "message": "Description cannot be under 10 characters!"})
		else:
			if sno == "":
				todo = Todo(description=description)
				message = "Your todo has been added successfully!"
			else:
				todo = Todo.objects.filter(sno=sno).first()
				todo.description = description
				message = "Your todo has been updated successfully!",

			todo.save()
			todos = Todo.objects.values()
			todo_data = list(todos)
			return JsonResponse({"msg_status": "success", "message": message, "todo_data": todo_data})
	else:
		return HttpResponse("Bad Request (400)")

def editTodo(request):
	if request.method == "POST":
		sno = request.POST.get('snoEdit');
		todo = Todo.objects.get(sno=sno)
		return JsonResponse({"todoId": todo.sno, "todoDesc": todo.description})
	else:
		return HttpResponse("Bad Request (400)")

def deleteTodo(request):
	if request.method == "POST":
		sno = request.POST.get('snoEdit');
		todo = Todo.objects.get(sno=sno)
		todo.delete()
		return JsonResponse({"msg_status": "success", "message": "Your todo has been successfully deleted!"})
	else:
		return HttpResponse("Bad Request (400)")