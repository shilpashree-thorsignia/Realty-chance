from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PropertyViewSet, InquiryViewSet, FavoriteViewSet, NewProjectViewSet,
    login_view, send_verification_code, verify_phone
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
]
