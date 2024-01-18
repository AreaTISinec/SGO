from django import forms


class ExcelForm(forms.Form):
    excel_file = forms.FileField(label='file', widget=forms.ClearableFileInput(attrs={'name': 'file'}))