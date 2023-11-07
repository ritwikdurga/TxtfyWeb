from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

#Function for signing in to the application
def signin(request):
    if request.method == "POST":
        email = request.POST.get('eml')
        password = request.POST.get('pwd')
        #Checks for the email
        if not email:
            messages.error(request, "Please enter a valid email.")
            return redirect('signin')
        try:
            #Validates the email entered
            validate_email(email)
            user = User.objects.get(email=email)
            #Validates the password
            if user.check_password(password):
                login(request, user)
                request.session['eml'] = email
                return redirect('home')
            else:
                messages.error(request, "Invalid password. Please try again.")
                return redirect('signin')
        #Error messages if the email is invalid
        except ValidationError:
            messages.error(
                request, "Invalid email address. Enter a valid email.")
            return redirect('signin')
        #Error message if the user does not exist
        except User.DoesNotExist:
            messages.error(request, 'Sure thing! How about "Signup"?')
            return redirect('signin')
    return render(request, 'signin/signin.html')
