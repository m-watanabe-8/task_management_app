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
            if search_type == 'today':
                # 本日日付が開始日と終了日の範囲内のデータ
                tasks = Task.objects.filter(
                    start_date__lte=today,
                    end_date__gte=today
                )

                serializer = TaskSerializer(tasks, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            elif search_type == 'specific_date':
                # 指定日を変換
                specific_date_str_start = request.query_params.get('specific_date_start')
                specific_date_str_end = request.query_params.get('specific_date_end')
                specific_date_start = make_aware(datetime.strptime(specific_date_str_start, '%Y-%m-%d'))
                specific_date_end = make_aware(datetime.strptime(specific_date_str_end, '%Y-%m-%d'))

                # 指定日が開始日の範囲内のデータ（完了以外）
                tasks = Task.objects.filter(
                    start_date__gte=specific_date_start,
                    start_date__lte=specific_date_end,
                    is_done = False
                )

                serializer = TaskSerializer(tasks, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
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