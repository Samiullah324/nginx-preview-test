def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.text == "ok"


def test_register_success(client):
    response = client.post(
        "/api/auth/register",
        json={"email": "user@example.com", "password": "securepass"},
    )

    assert response.status_code == 201
    body = response.json()
    assert body["message"] == "User registered successfully"
    assert body["user"]["email"] == "user@example.com"
    assert "id" in body["user"]
    assert "created_at" in body["user"]


def test_register_duplicate_email(client):
    payload = {"email": "user@example.com", "password": "securepass"}
    client.post("/api/auth/register", json=payload)

    response = client.post("/api/auth/register", json=payload)

    assert response.status_code == 409
    assert response.json()["detail"] == "A user with this email already exists"


def test_register_validation_errors(client):
    invalid_email = client.post(
        "/api/auth/register",
        json={"email": "not-an-email", "password": "securepass"},
    )
    assert invalid_email.status_code == 422

    short_password = client.post(
        "/api/auth/register",
        json={"email": "user@example.com", "password": "short"},
    )
    assert short_password.status_code == 422


def test_login_success(client):
    client.post(
        "/api/auth/register",
        json={"email": "user@example.com", "password": "securepass"},
    )

    response = client.post(
        "/api/auth/login",
        json={"email": "user@example.com", "password": "securepass"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]
    assert body["user"]["email"] == "user@example.com"


def test_login_invalid_credentials(client):
    client.post(
        "/api/auth/register",
        json={"email": "user@example.com", "password": "securepass"},
    )

    wrong_password = client.post(
        "/api/auth/login",
        json={"email": "user@example.com", "password": "wrong-password"},
    )
    assert wrong_password.status_code == 401
    assert wrong_password.json()["detail"] == "Invalid email or password"

    unknown_user = client.post(
        "/api/auth/login",
        json={"email": "unknown@example.com", "password": "securepass"},
    )
    assert unknown_user.status_code == 401


def test_login_validation_errors(client):
    invalid_email = client.post(
        "/api/auth/login",
        json={"email": "not-an-email", "password": "securepass"},
    )
    assert invalid_email.status_code == 422

    missing_password = client.post(
        "/api/auth/login",
        json={"email": "user@example.com", "password": ""},
    )
    assert missing_password.status_code == 422
