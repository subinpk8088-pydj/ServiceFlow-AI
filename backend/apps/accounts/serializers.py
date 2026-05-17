from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:
        model = User

        fields = [
            'id',
            'email',
            'username',
            'password',
            'phone_number',
            'role',
        ]

    def create(self, validated_data):

        password = validated_data.pop('password')

        user = User(**validated_data)

        user.set_password(password)

        user.save()

        return user


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            'id',
            'email',
            'username',
            'phone_number',
            'profile_image',
            'role',
        ]