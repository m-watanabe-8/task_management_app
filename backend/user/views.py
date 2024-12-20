from rest_framework import viewsets
from rest_framework_simplejwt import views as jwt_views
from .models import User
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt import views as jwt_views
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# ユーザー作成
class CreateUserViewSet(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

# JWT認証
class ObtainTokenPairWithColorView(jwt_views.TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ユーザーID検索
class SearchUserView(APIView):
    def get(self, request):
        # パラメータ
        email = request.query_params.get('email')

        try:
            # emailが一致するデータ
            user = User.objects.filter(
                email=email
            )
            serializer = UserSerializer(user, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )