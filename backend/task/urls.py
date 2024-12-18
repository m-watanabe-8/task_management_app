from django.urls import include,path
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet,TaskListView

router = DefaultRouter()
router.register(r'task', TaskViewSet, basename="task")

urlpatterns = [
    path('', include(router.urls)),
    path('task-search/', TaskListView.as_view(), name="task-search"),
]