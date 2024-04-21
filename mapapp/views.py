from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from .models import MapNews

# Create your views here.
def index(request):
    items = MapNews.objects.all()
  
    myList = []

    for obj in items:
        my_dict = {}
        my_dict["name"] = obj.name
        my_dict["message"] = obj.message
        my_dict["location"] = obj.location
        my_dict["startTime"] = obj.startTime
        my_dict["endTime"] = obj.endTime
        my_dict["when"] = obj.when
        my_dict["eventType"] = obj.eventType
        myList.append(my_dict)
       
    # Return the JSON response
    return JsonResponse({"data":myList})


def add(request):
    name = request.GET.get("name")
    message = request.GET.get("message")
    location = request.GET.get("location")
    startTime = request.GET.get("startTime")
    eventType = request.GET.get("eventType")
    endTime = request.GET.get("endTime")
    when = request.GET.get("when")
    item = MapNews(message=message,location=location, name=name,  startTime=startTime, eventType=eventType, endTime=endTime,when=when)
    item.save()
    return JsonResponse({"saved":"true"})
