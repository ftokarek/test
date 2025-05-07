from app.auth.auth import authenticate_user
from app.models.user_model import UserLogin

# Mock MongoDB data (replace with actual database setup in production)
mock_users = [
    {"username": "testuser", "email": "testuser@example.com", "password": "securepassword123"},
    {"username": "anotheruser", "email": "anotheruser@example.com", "password": "anotherpassword456"}
]

# Mock the database query
def mock_find_one(query):
    for user in mock_users:
        if query.get("email") == user.get("email") or query.get("username") == user.get("username"):
            return user
    return None

# Replace the database query function with the mock
from NeuroSphere.backend.app.auth.auth import users_collection
users_collection.find_one = mock_find_one

# Test login with email
def test_login_with_email():
    login_data = UserLogin(identifier="uzytkownik@mail.com", password="haslohaslo")
    result = authenticate_user(login_data)
    print("Login with email:", result)

# Test login with username
def test_login_with_username():
    login_data = UserLogin(identifier="uzytkownik", password="haslohaslo")
    result = authenticate_user(login_data)
    print("Login with username:", result)

# Test invalid login
def test_invalid_login():
    login_data = UserLogin(identifier="nonexistentuser", password="wrongpassword")
    try:
        authenticate_user(login_data)
    except Exception as e:
        print("Invalid login:", e)

# Run tests
if __name__ == "__main__":
    test_login_with_email()
    test_login_with_username()
    test_invalid_login()
