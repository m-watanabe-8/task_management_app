from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from datetime import datetime
from django.utils.timezone import make_aware
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskListView(APIView):
    def get(self, request):
        # パラメータ
        search_type = request.query_params.get('search_type', 'today')
        today = make_aware(datetime.today())

        try:
            # 本日日付が開始日と終了日の範囲内のログインユーザーのデータ
            if search_type == 'today':
                user = request.query_params.get('login_user')               
                tasks = Task.objects.filter(
                    start_date__lte=today,
                    end_date__gte=today,
                    user=user
                )

                serializer = TaskSerializer(tasks, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            # 指定日が開始日の範囲内のログインユーザーのデータ（完了以外）
            elif search_type == 'specific_date':
                # 指定日を変換
                specific_date_str_start = request.query_params.get('specific_date_start')
                specific_date_start = make_aware(datetime.strptime(specific_date_str_start, '%Y-%m-%d'))
                user = request.query_params.get('login_user')
                
                tasks = Task.objects.filter(
                    start_date__gte=specific_date_start,
                    user=user,
                    is_done = False
                )

                serializer = TaskSerializer(tasks, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            # 本日日付が開始日と終了日の範囲内の全員のデータ
            elif search_type == 'member':
                # 指定日を変換
                specific_date_str_start = request.query_params.get('specific_date_start')
                specific_date_str_end = request.query_params.get('specific_date_end')
                specific_date_start = make_aware(datetime.strptime(specific_date_str_start, '%Y-%m-%d'))
                specific_date_end = make_aware(datetime.strptime(specific_date_str_end, '%Y-%m-%d'))

                tasks = Task.objects.filter(
                    start_date__lte=specific_date_start,
                    end_date__gte=specific_date_end,
                    is_done = False
                )

                # ユーザーごとのタスクを取得
                user_tasks = {}
                for task in tasks:
                    user = task.user.username
                    if user not in user_tasks:
                        user_tasks[user] = []
                    user_tasks[user].append(task)

                serialized_tasks = {}
                for user, task_list in user_tasks.items():
                    serialized_tasks[user] = TaskSerializer(task_list, many=True).data

                return Response(serialized_tasks, status=status.HTTP_200_OK)
            
            else:
                return Response(
                    {"error": "Invalid search_type"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )