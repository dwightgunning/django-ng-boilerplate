from collections import Counter

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(max_length=128, required=False)
    password_new = serializers.CharField(max_length=128, required=False)

    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password", "password_new")
        write_only_fields = ("password", "password_new")

    def create(self, validated_data):
        password = validated_data.pop("password")
        instance = super(UserSerializer, self).create(validated_data)

        # Assign the password via the User method to apply appropriate hash
        instance.set_password(password)
        instance.save()

        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        instance = super(UserSerializer, self).update(instance, validated_data)

        if password:
            # Assign the password via the User method to apply appropriate hash
            instance.set_password(validated_data.get("password"))
            instance.save()

        return instance

    def validate(self, data):
        if self.instance and self.instance.pk:
            data = self.validate_update(data)
        else:
            data = self.validate_create(data)

        return super(UserSerializer, self).validate(data)

    def validate_create(self, data):
        # Validate the password field
        password = data.get("password")
        if password:
            try:
                validate_password(password, self.instance)
            except ValidationError as e:
                raise serializers.ValidationError({"password": e.messages})
        else:
            raise serializers.ValidationError(
                {"password": _("This field is required.")}
            )

        # Ensure the email address is unique; this is not checked by User model
        if get_user_model().objects.filter(email=data.get("email")).exists():
            raise serializers.ValidationError(
                {"email": _("An account with that email already exists.")}
            )

        return data

    def validate_update(self, data):
        password = data.get("password")
        if password:
            # For simplicity, password updates must not modify other fields
            try:
                password_new = data.pop("password_new")
            except KeyError:
                raise serializers.ValidationError(
                    _("Password must be updated via 'password_new' field.")
                )

            # Validate the new password
            if not password_new:
                raise serializers.ValidationError(
                    {"password_new": _("New Password required.")}
                )
            elif Counter(list(data.keys())) != Counter(["password"]):
                raise serializers.ValidationError(
                    _(
                        "Password cannot be updated in combination \
                       with any other fields."
                    )
                )
            elif not self.instance.check_password(password):
                raise serializers.ValidationError({"password": _("Incorrect password")})
            else:
                try:
                    validate_password(password_new, self.instance)
                except ValidationError as e:
                    raise serializers.ValidationError({"password_new": e.messages})

            # Assign the new password; persisted by the ModelSerializer update
            data["password"] = password_new

        return data

    def to_representation(self, instance):
        # Add the password_new property to avoid a ModelSerializer key error
        instance.password_new = None

        rep = super(UserSerializer, self).to_representation(instance)

        # Remove hidden fields from the ModelSerializer representation
        rep.pop("password", None)
        rep.pop("password_new", None)

        return rep
