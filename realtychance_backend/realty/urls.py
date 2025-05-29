from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PropertyViewSet, InquiryViewSet, FavoriteViewSet, NewProjectViewSet,
    login_view, send_verification_code, verify_phone, register_owner, register_seeker
)

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'inquiries', InquiryViewSet)
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'new-projects', NewProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login_view, name='login'),
    path('auth/send-verification/', send_verification_code, name='send-verification'),
    path('auth/verify-phone/', verify_phone, name='verify-phone'),
    path('register-owner/', register_owner, name='register-owner'),
    path('register-seeker/', register_seeker, name='register-seeker'),
    # Removed conflicting/erroneous path:
    # path('properties/', views.PropertyListCreateView.as_view(), name='property-list-create'),
]
