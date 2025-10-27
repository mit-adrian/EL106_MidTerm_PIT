# backend/core/views.py
from django.http import JsonResponse

def ping(request):
    return JsonResponse({"ok": True, "message": "pong", "path": request.path})
