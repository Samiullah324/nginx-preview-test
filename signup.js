(function () {
  "use strict";

  var form = document.getElementById("signup-form");
  if (!form) {
    return;
  }

  var successMessage = document.getElementById("success-message");
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirm-password");
  var strengthBar = document.getElementById("password-strength-bar");
  var strengthLabel = document.getElementById("password-strength-label");

  function getFieldById(fieldId) {
    return document.getElementById(fieldId);
  }

  function getErrorElement(fieldId) {
    return document.querySelector('[data-error-for="' + fieldId + '"]');
  }

  function showFieldError(fieldId, isVisible, message) {
    var error = getErrorElement(fieldId);
    var field = getFieldById(fieldId);

    if (error) {
      if (message) {
        error.textContent = message;
      }
      error.classList.toggle("visible", isVisible);
    }

    if (field) {
      field.classList.toggle("is-invalid", isVisible);
      field.setAttribute("aria-invalid", isVisible ? "true" : "false");
    }
  }

  function clearFieldError(fieldId) {
    showFieldError(fieldId, false);
  }

  function getPasswordStrength(password) {
    if (!password) {
      return { level: "", label: "" };
    }

    var score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score <= 2) {
      return { level: "weak", label: "Weak password" };
    }
    if (score <= 3) {
      return { level: "fair", label: "Fair password" };
    }
    return { level: "strong", label: "Strong password" };
  }

  function updatePasswordStrength() {
    var password = passwordInput.value;
    var strength = getPasswordStrength(password);

    strengthBar.className = "password-strength__bar";
    if (strength.level) {
      strengthBar.classList.add(strength.level);
    }
    strengthLabel.textContent = strength.label;
  }

  function validateFullName(showEmptyErrors) {
    var field = getFieldById("full-name");
    var value = field.value.trim();
    var isValid = value.length >= 2;

    if (!isValid && (showEmptyErrors || value.length > 0)) {
      showFieldError(
        "full-name",
        true,
        value.length === 0 ? "Please enter your full name." : "Full name must be at least 2 characters."
      );
    } else if (isValid) {
      clearFieldError("full-name");
    }

    return isValid;
  }

  function validateEmail(showEmptyErrors) {
    var field = getFieldById("email");
    var value = field.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = emailPattern.test(value);

    if (!isValid && (showEmptyErrors || value.length > 0)) {
      showFieldError(
        "email",
        true,
        value.length === 0 ? "Please enter your email address." : "Please enter a valid email address."
      );
    } else if (isValid) {
      clearFieldError("email");
    }

    return isValid;
  }

  function validateRole(showEmptyErrors) {
    var selectedRole = form.querySelector('input[name="role"]:checked');
    var isValid = selectedRole !== null;

    if (!isValid && showEmptyErrors) {
      showFieldError("role", true);
    } else if (isValid) {
      clearFieldError("role");
    }

    return isValid;
  }

  function validatePassword(showEmptyErrors) {
    var value = passwordInput.value;
    var isValid = value.length >= 8;

    if (!isValid && (showEmptyErrors || value.length > 0)) {
      showFieldError(
        "password",
        true,
        value.length === 0 ? "Please enter a password." : "Password must be at least 8 characters."
      );
    } else if (isValid) {
      clearFieldError("password");
    }

    return isValid;
  }

  function validateConfirmPassword(showEmptyErrors) {
    var value = confirmPasswordInput.value;
    var passwordValue = passwordInput.value;
    var isValid = value.length > 0 && value === passwordValue;

    if (!isValid && (showEmptyErrors || value.length > 0)) {
      showFieldError(
        "confirm-password",
        true,
        value.length === 0 ? "Please confirm your password." : "Passwords do not match."
      );
    } else if (isValid) {
      clearFieldError("confirm-password");
    }

    return isValid;
  }

  function validateField(fieldId, showEmptyErrors) {
    switch (fieldId) {
      case "full-name":
        return validateFullName(showEmptyErrors);
      case "email":
        return validateEmail(showEmptyErrors);
      case "role":
        return validateRole(showEmptyErrors);
      case "password":
        return validatePassword(showEmptyErrors);
      case "confirm-password":
        return validateConfirmPassword(showEmptyErrors);
      default:
        return true;
    }
  }

  function validateForm(showEmptyErrors) {
    var fieldIds = ["full-name", "email", "role", "password", "confirm-password"];
    var results = fieldIds.map(function (fieldId) {
      return validateField(fieldId, showEmptyErrors);
    });
    return results.every(Boolean);
  }

  function focusFirstInvalidField() {
    var fieldOrder = ["full-name", "email", "role-student", "password", "confirm-password"];

    for (var i = 0; i < fieldOrder.length; i += 1) {
      var fieldId = fieldOrder[i];
      if (fieldId === "role-student") {
        if (!form.querySelector('input[name="role"]:checked')) {
          getFieldById("role-student").focus();
          return;
        }
        continue;
      }

      var field = getFieldById(fieldId);
      if (field && field.classList.contains("is-invalid")) {
        field.focus();
        return;
      }
    }
  }

  document.querySelectorAll(".toggle-password").forEach(function (button) {
    button.addEventListener("click", function () {
      var targetId = button.getAttribute("data-target");
      var input = getFieldById(targetId);
      var isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      button.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    });
  });

  form.querySelectorAll("input:not([type='radio'])").forEach(function (field) {
    field.addEventListener("blur", function () {
      validateField(field.id, false);
    });

    field.addEventListener("input", function () {
      if (field.id === "password") {
        updatePasswordStrength();
        if (confirmPasswordInput.value.length > 0) {
          validateConfirmPassword(false);
        }
      }

      if (field.classList.contains("is-invalid")) {
        validateField(field.id, false);
      }
    });
  });

  form.querySelectorAll('input[name="role"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      validateRole(false);
    });
  });

  passwordInput.addEventListener("input", updatePasswordStrength);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var isValid = validateForm(true);

    if (!isValid) {
      focusFirstInvalidField();
      return;
    }

    form.classList.add("hidden");
    successMessage.classList.add("visible");
  });
})();
