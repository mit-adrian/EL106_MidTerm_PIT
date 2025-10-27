# accounts/permissions.py
from rest_framework.permissions import BasePermission

class IsSuperUser(BasePermission):
    """
    Allow only Django superusers.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)

class IsAdminUserRole(BasePermission):
    """
    Allow users whose role is ADMIN or superuser.
    """
    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and (getattr(user, "role", None) == user.ROLE_ADMIN or user.is_superuser))

class IsManagerUserRole(BasePermission):
    """
    Allow users whose role is MANAGER or ADMIN or superuser.
    (Admins can act as managers.)
    """
    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser:
            return True
        if getattr(user, "role", None) == user.ROLE_ADMIN:
            return True
        return getattr(user, "role", None) == user.ROLE_MANAGER
