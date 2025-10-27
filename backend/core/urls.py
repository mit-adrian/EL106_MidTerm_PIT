from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import RedirectView, TemplateView
from .views import ping

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ping/', ping),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('blog.urls')),

]
