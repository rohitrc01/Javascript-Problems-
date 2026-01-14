
// Problem Statement:
// Read a CSV with id, first_name, last_name, email, phone_no and validate email and phone asynchronously using setTimeout.
// For each row, run email and phone validation in parallel and log whichever validation finishes first.

// Expected Output:
// For each CSV row, console logs which validation (EMAIL or PHONE) completed first along with its true/false result.






// ================= REGEX =================
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const INDIAN_MOBILE_REGEX = /\+\d{1,2}-\d{3}-\d{3}-\d{4}/;

// ================= ASYNC EMAIL VALIDATION =================
function validateEmail(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isValid = EMAIL_REGEX.test(email || "");
      resolve(isValid);
    }, 0);
  });
}

// ================= ASYNC PHONE VALIDATION =================
function validatePhone(phone) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isValid = INDIAN_MOBILE_REGEX.test(phone || "");
      resolve(isValid);
    }, 0);
  });
}

// ================= ROW VALIDATION =================
async function validateRow(row) {
  const [emailValid, phoneValid] = await Promise.all([
    validateEmail(row.email),
    validatePhone(row.phone_no)
  ]);

  return {
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    phone_no: row.phone_no,
    emailValid,
    phoneValid,
    isRowValid: emailValid && phoneValid
  };
}

// ================= CSV PROCESSOR =================
function processCSV(file) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,

    complete: async function (results) {
      const rows = results.data;

      const validatedRows = await Promise.all(
        rows.map(row => validateRow(row))
      );

      console.table(validatedRows);
    }
  });
}

// ================= FILE INPUT =================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("csvFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      processCSV(file);
    }
  });
});


