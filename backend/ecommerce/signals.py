from django.db.models.signals import pre_save
# Listening when model is about to save, then can fire off some action before it saves

from django.contrib.auth.models import User



# update all users to have username = email
def updateUser(sender, instance , **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)