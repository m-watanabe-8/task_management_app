from rest_framework import serializers
from .models import Task
from user.models import User
from user.serializers import UserSerializer
from django.contrib.auth.hashers import make_password

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'content',
            'category',
            'start_date',
            'end_date',
            'status',
            'is_done',
            'user',     # USERモデルから取得
        ]

    def get_user(self, obj):
        try:
            user_abstruct_contents = UserSerializer(
                User.objects.all().filter(user = User.objects.get(id=obj.id)), many=True
            ).data
            return user_abstruct_contents
        except:
            user_abstruct_contents = None
            return user_abstruct_contents

