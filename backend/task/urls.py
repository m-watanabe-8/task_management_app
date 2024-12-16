from django.urls import include,path
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskStatusViewSet

router = DefaultRouter()
router.register(r'task', TaskViewSet, basename="task")
router.register(r'task-status', TaskStatusViewSet, basename="task-status")

urlpatterns = [
    path('', include(router.urls)),
]