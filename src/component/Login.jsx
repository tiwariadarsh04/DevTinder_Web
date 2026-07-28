const handleSignup = async () => {
  try {
    const data = { firstName, lastName, emailId: email, password };
    const checkEmailPassword = checkValidData(email, password);
    
    if (checkEmailPassword) {
      setError(checkEmailPassword);
      setWarnning(true);
      setTimeout(() => setWarnning(false), 3000);
      return;
    }

    const res = await axios.post(BASE_URL + "/signup", data, { withCredentials: true });
    setShowOtpField(true);
  } catch (error) {
    // Extract exact backend error message
    const backendError = 
      error.response?.data?.error?.message || 
      error.response?.data?.message || 
      "Registration failed. Please check your credentials.";
      
    setError(backendError);
    setWarnning(true);
    setTimeout(() => setWarnning(false), 4000);
  }
};