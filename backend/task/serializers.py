from rest_framework import serializers
from .models import Task, TaskStatusModel
from django.contrib.auth.hashers import make_password

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatusModel
        fields = "__all__"