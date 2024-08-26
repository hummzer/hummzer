from django import forms
from information.models import Information, Project



class EditProfileForm(forms.ModelForm):
	
	class Meta:
		model = Information
		exclude = ('birth_date', 'address', 'cv')

class CreateProjectForm(forms.ModelForm):

	class Meta:
		model = Project
		exclude = ('Slug',)
