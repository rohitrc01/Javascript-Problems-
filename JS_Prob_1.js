/*
Problem Description:
We collect user details for saving into a CSV file.
Dob cannot be future date, and empty missing values are to be autofilled

Expected Output:
- Future dates for date of birth (dob) are rejected.
- Missing or empty registration dates are automatically filled with today’s date.
*/

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

const userHandler = {
  set(target, prop, value) {

    // Prevent future dates
    if (prop === "dob") {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate > today) {
        console.log("Future dates are not allowed");
        return false;
      }
    }

    // Auto-fill registration date
    if (prop === "regDate" && (!value || value === "")) {
      value = getTodayDate();
      console.log("ℹRegistration date auto-filled:", value);
    }

    target[prop] = value;
    return true;
  }
};

const user = new Proxy({}, userHandler);

user.name = "Rohit"
user.dob = "2000-05-10"
user.regDate = ""


/*
OUTPUT
{
  name: "Rohit",
  dob: "2000-05-10",
  regDate: "2026-01-14"

} */

