from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def AdminDataView(request):
    user = request.user
    if not (user.is_superuser or getattr(user, "is_admin", lambda: False)()):
        raise PermissionDenied("Only admins can access this data.")

    # Example admin data
    total_users = User.objects.count()
    total_managers = User.objects.filter(role=User.ROLE_MANAGER).count()
    total_writers = User.objects.filter(role=User.ROLE_WRITER).count()

    return Response({
        "total_users": total_users,
        "total_managers": total_managers,
        "total_writers": total_writers,
    })
