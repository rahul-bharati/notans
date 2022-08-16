export const getErrorMessage = (errorCode: string): string => {
  let message = "";
  switch (errorCode) {
    case "auth/email-already-in-use":
      message = "This email is already in use";
      break;
    case "auth/invalid-email":
      message = "Please enter an valid email";
      break;
    case "auth/weak-password":
      message = "Please select a strong password";
      break;
    case "auth/operation-not-allowed":
      message = "This operation is allowed at this moment";
      break;
    default:
      message = "";
      break;
  }
  return message;
};
