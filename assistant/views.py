from django.shortcuts import render
# assistant/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def assistant(request):
    if request.method == 'POST':
        user_input = request.POST.get('user_input')
        response = "Assistant: You said - " + user_input

        return JsonResponse({'response': response})
    return render(request, 'index.html')