from bson import ObjectId  
from app.models.user_model import UserCreate, UserLogin, UserOut, PyObjectId

# Test UserCreate model
def test_user_create():
    user_data = {
        "username": "uzytkownik",
        "email": "uzytkowik@mail.com",
        "password": "haslohaslo"  # Updated to meet the minimum length requirement
    }
    user = UserCreate(**user_data)
    print("UserCreate model works:", user)

# Test UserLogin model
def test_user_login():
    login_data = {
        "identifier": "uzytkownik@mail.com",  
        "password": "haslohaslo"  
    }
    login = UserLogin(**login_data)
    print("UserLogin model works:", login)

# Test UserOut model
def test_user_out():
    user_out_data = {
        "_id": str(ObjectId()),
        "username": "uzytkownik",
        "email": "uzytkownik@mail.com"
    }
    user_out = UserOut(**user_out_data)
    print("UserOut model works:", user_out)

#run tests
if __name__ == "__main__":
    test_user_create()
    test_user_login()
    test_user_out()
