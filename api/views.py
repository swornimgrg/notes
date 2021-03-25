from django.shortcuts import render
from rest_framework import generics

from .models import Note
from .serializers import NoteSerializer


class NoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filterset_fields = ['archived']


class NoteRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
