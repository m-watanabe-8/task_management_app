from django.urls import include,path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CreateUserViewSet,SearchUserView

router = DefaultRouter()
router.register(r'user', UserViewSet, basename="user")

urlpatterns = [
    path('', include(router.urls)),
    path('user-create/', CreateUserViewSet.as_view(), name="user-create"),
    path('user-search/', SearchUserView.as_view(), name="user-search"),
]