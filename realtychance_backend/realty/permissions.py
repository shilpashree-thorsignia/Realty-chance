from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is the owner of the object
        return obj.owner == request.user

class IsPropertyOwner(permissions.BasePermission):
    """
    Custom permission to only allow users with 'owner' role.
    """
    def has_permission(self, request, view):
        return request.user.role == 'owner'

class IsPropertySeeker(permissions.BasePermission):
    """
    Custom permission to only allow users with 'seeker' role.
    """
    def has_permission(self, request, view):
        return request.user.role == 'seeker'

class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow users with 'admin' role.
    """
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsProjectCreator(permissions.BasePermission):
    """
    Custom permission to only allow creators of a project to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is the creator of the project
        return obj.added_by == request.user