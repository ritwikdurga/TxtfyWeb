from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.hashers import check_password, make_password
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView
from django.urls import reverse
from django.utils.safestring import mark_safe

#Function for signing up
def signup(request):
    if request.method == "POST":
        if 'eml' in request.POST:
            email = request.POST['eml']
            #Verifying whether user is in the database or not
            if User.objects.filter(email=email).exists():
                messages.error(
                    request, "Email already registered. Please Sign In")
                return render(request, 'user/signup_email.html')
            request.session['eml'] = email
            return render(request, 'user/signup_password.html', {'email': email})
        elif 'name' in request.POST:
            email = request.session.get('eml', None)
            if email:
                name = request.POST['name']
                password = request.POST['pwd']
                cpassword = request.POST['cpwd']
                if " " in name:
                    first_name, last_name = name.split(" ", 1)
                else:
                    first_name = name
                    last_name = " "
            if password == cpassword:
                hashed_password = make_password(password)
                hashed_password = password
                #Saving the name and password in the password
                user = User.objects.create_user(
                    username=email, email=email, password=hashed_password, first_name=first_name, last_name=last_name)
                messages.success(request, 'Account created successfully')
                return redirect('signin')
    return render(request, 'user/signup_email.html')

#Function for the profile 
@login_required
def profile(request):
    if 'error_messages' in request.session:
        del request.session['error_messages']
    user = request.user
    if request.method == "POST":
        if 'name' in request.POST:
            new_name = request.POST.get('name')
            new_name = request.POST.get('name')
            if " " in new_name:
                first_name, last_name = new_name.split(" ", 1)
            else:
                first_name = new_name
                last_name = " "
            user.first_name=first_name
            user.last_name=last_name
            user.save()
            messages.success(request, 'Name Updated Successfully')
            return redirect('profile')
    return render(request, 'user/user_profile.html', {'user': user})

#Function for changing passwords
@login_required
def changepwd(request):
    if request.method == 'POST':
        user = request.user
        old_password = request.POST.get('opwd')
        new_password = request.POST.get('pwd')
        confirm_password = request.POST.get('cpwd')
        #Checking if the password is same as the old password
        if check_password(old_password, user.password):
            if new_password == old_password:
                messages.error(request, "Password already in use")
                return redirect('change_password')
            if new_password == confirm_password:
                hashed_password = make_password(new_password)
                user.password = hashed_password
                user.save()
                update_session_auth_hash(request, user)
                messages.success(request, 'Password Updated Successfully')
                return redirect('profile')
            else:
                messages.error(
                    request, 'New Password and Confirm Password do not match')
        else:
            messages.error(request, 'Current Password Not Matching')

    return render(request, 'user/change_pwd.html', {'user': request.user})

#Class for Password Reset
class CustomPasswordResetView(PasswordResetView):
    def form_valid(self, form):
        email = form.cleaned_data['email']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            signup_url = reverse('signup')
            error_message = 'Email address not found. Please <a style="color: #0000FF" href="{}">Sign up</a>.'.format(signup_url)
            messages.error(self.request, mark_safe(error_message))
            return self.form_invalid(form)

        return super().form_valid(form)
