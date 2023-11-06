from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


def signin(request):
    if request.method == "POST":
        email = request.POST.get('eml')
        password = request.POST.get('pwd')

        if not email:
            messages.error(request, "Please enter a valid email.")
            return redirect('signin')
        try:
            validate_email(email)
            user = User.objects.get(email=email)
            if user.check_password(password):
                login(request, user)
                request.session['eml'] = email
                return redirect('home')
            else:
                messages.error(request, "Invalid password. Please try again.")
                return redirect('signin')
        except ValidationError:
            messages.error(
                request, "Invalid email address. Enter a valid email.")
            return redirect('signin')
        except User.DoesNotExist:
            messages.error(request, 'Sure thing! How about "Signup"?')
            return redirect('signin')
    return render(request, 'signin/signin.html')
