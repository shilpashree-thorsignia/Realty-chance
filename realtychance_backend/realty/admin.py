from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, Property, PropertyImage, Inquiry, Favorite, NewProject, ProjectImage

class CustomUserAdmin(UserAdmin):
    # Customize the fieldsets to include your custom fields
    fieldsets = (
        (None, {'fields': ('phone', 'password')}),
        (_('Personal info'), {'fields': ('full_name', 'email')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'role', 'is_phone_verified', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    # Customize the add_fieldsets to include your custom fields
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'email', 'full_name', 'password1', 'password2', 'role'),
        }),
    )
    
    # Customize the list display to show your custom fields
    list_display = ('phone', 'email', 'full_name', 'role', 'is_staff')
    
    # Customize the search fields to include your custom fields
    search_fields = ('phone', 'email', 'full_name')
    
    # Set the ordering to use your custom fields
    ordering = ('phone',)
    
    # Set username field to None to avoid validation issues
    username_field = None

# Register your models with the admin site
admin.site.register(User, CustomUserAdmin)
admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(Inquiry)
admin.site.register(Favorite)
admin.site.register(NewProject)
admin.site.register(ProjectImage)
