from rest_framework import viewsets
from rest_framework_simplejwt import views as jwt_views
from .models import User
from .serializers import UserSerializer, MyTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# JWT認証
class ObtainTokenPairWithColorView(jwt_views.TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer