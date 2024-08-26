from django.db import models
import re
from ckeditor.fields import RichTextField

class Information(models.Model):
    full_name = models.CharField(max_length=50, blank=True, null=True)
    avatar = models.ImageField(upload_to="avatar/", blank=True, null=True)
    short_about = models.TextField(blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    birth_date = models.DateTimeField(blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.EmailField(max_length=255, blank=True, null=True)

    cv = models.FileField(upload_to='cv', blank=True, null=True)

    #Social Networks and Accounts
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    upwork = models.URLField(blank=True, null=True)
    discord = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.full_name

class Competence(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=False, null=False)
    image = models.ImageField(upload_to='competence/',blank=False, null=False)

    def __str__(self):
        return self.title

class Education(models.Model):
    title = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    year = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return self.title

class Experience(modells.Model):
    title = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    year = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return self.title

class Project(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False)
    slug = models.SlugField(max_length=200, blank=True, null=True)
    description = RichTextField(blank=False, null=False)
    image = models.ImageField(upload_to="projects/", blank=False, null=False)
    tools = models.CharField(max_length=200, blank=False, null=False)
    demo = models.URLField()
    github = models.URLField()
    show_in_slider = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def get_project_absolute_url(self):
        return "/projects/{}".format(self.slug)

    def save(self, *args, **kwargs):
        self.slug = self.slug_generate()
        super(Project, self).save(*args, **kwargs)

    def slug_generate(self):
        slug = self.title.strip()
        slug = re.sub(" ", "_", slug)
        return slug.lower()

class Message(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=255, null=Fals , blank=False)
    message = models.TextField(null=False, blank=False)
    send_time = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.name
