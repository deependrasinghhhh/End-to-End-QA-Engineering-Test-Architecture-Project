# TEST SCENARIOS: AUTHENTICATION & SECURITY (AUTH)

**Module:** Customer Account & Security  
**Specification Reference:** `REQ-AUTH-001` through `REQ-AUTH-009`  

---

| Scenario ID | Requirement ID | Type | Scenario Description | Expected Outcome |
|:---|:---|:---:|:---|:---|
| **SCEN-AUTH-001** | REQ-AUTH-001 | Positive | Register new customer with all mandatory fields and valid password | User registered successfully, account created, confirmation message displayed |
| **SCEN-AUTH-002** | REQ-AUTH-001 | Negative | Register with an already existing email address | System rejects registration and displays "The specified email already exists" |
| **SCEN-AUTH-003** | REQ-AUTH-001 | Validation | Register with mismatched password and confirm password fields | System prevents form submission and displays "The password and confirmation password do not match." |
| **SCEN-AUTH-004** | REQ-AUTH-001 | Boundary | Register with password below minimum length (e.g. 5 characters) | System displays validation message: "The password must have at least 6 characters" |
| **SCEN-AUTH-005** | REQ-AUTH-001 | Validation | Register with invalid email formats (missing @, missing domain) | Inline validation error indicates invalid email format |
| **SCEN-AUTH-006** | REQ-AUTH-002 | Positive | Authenticate with valid registered email and correct password | User successfully logged in, redirected to home, header displays "My account" and "Log out" |
| **SCEN-AUTH-007** | REQ-AUTH-003 | Negative | Authenticate with non-existent email address | Error alert: "Login was unsuccessful. Please correct the errors and try again. No customer account found" |
| **SCEN-AUTH-008** | REQ-AUTH-003 | Negative | Authenticate with valid email but incorrect password | Error alert: "The credentials provided are incorrect" |
| **SCEN-AUTH-009** | REQ-AUTH-003 | Validation | Submit empty login credentials | Client-side validation triggers on required email and password inputs |
| **SCEN-AUTH-010** | REQ-AUTH-004 | Security | Validate "Remember Me" persistent cookie functionality | Session remains active after closing and reopening browser instance |
| **SCEN-AUTH-011** | REQ-AUTH-005 | Recovery | Request password reset for valid registered email address | System displays "Email with instructions has been sent to you." |
| **SCEN-AUTH-012** | REQ-AUTH-009 | Security | Customer log out | Active session cookie destroyed, user redirected, header shows "Log in" and "Register" |
