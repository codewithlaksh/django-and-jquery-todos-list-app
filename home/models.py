from django.db import models

# Create your models here.
class Todo(models.Model):
	sno = models.AutoField(primary_key=True)
	description = models.TextField()
	updated = models.DateTimeField(auto_now=True)
	created = models.DateTimeField(auto_now_add=True)