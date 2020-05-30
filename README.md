**Base URL**
`http://localhost:4001/v1/`

## Api Done

#### Login With Google / Register with google

###### API: `BaseURL+"socialLogin"`

###### Method: `POST`

###### Request Body:

```json
{
  "token": "google_id_token",
  "auth_for": "Service name"
}
```

###### Response Body:

```json
{
  "message": "Login successful!",
  "token": "jwt_token_here",
  "registration_completed": true,
  "user_data": {
    "id": "5e7b21da2579a9425041c2d6",
    "email": "kiran@gmail.com",
    "name": "Kiran",
    "image": "some_url_here"
  }
}
```

#### Complete Registration

###### API: `BaseURL+"completeRegistration"`

###### Method: `POST`

###### Request Body:

```json
{
  "phone_number": "some_phone_number",
  "gender": "Male | Female",
  "facebook_id": "some_link",
  "address": "some_address"
}
```

###### Response Body:

```json
{
  "message": "Registration completed successfully..",
  "data": {
    "_id": "5ec95d4fdae0fd248c37c5d8",
    "name": "Kiran Neupane",
    "phone_number": "9805311953",
    "gender": "Male",
    "registration_completed": true,
    "updated_at": "2020-05-23T18:52:11.515Z"
  }
}
```

#### Verify Token

###### API: `BaseURL+"verifyToken"`

###### Method: `POST`

###### Request Body:

```json
{
  "token": "some_jwt_token"
}
```

###### Response Body:

```json
{
  "id": "5ec95d4fdae0fd248c37c5d8",
  "name": "Kiran Neupane",
  "email": "tokeyrun@gmail.com",
  "image": "https://lh3.googleusercontent.com/a-/AOh14GjbNO4hfWMxW11agJOHPaqtqmCzGbxOpQODalgs=s96-c",
  "iat": 1590254927
}
```
