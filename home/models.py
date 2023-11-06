# models.py
from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    def __str__(self):
        if self.name == 'Untitled':
            var = f'{self.name}_{self.id}'
        else:
            var = self.name
        return var

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(default='Untitled', max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    flag = models.BooleanField(default=False)
    content = models.TextField(default='')
    output = models.FileField(null=True)

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    image = models.ImageField()
