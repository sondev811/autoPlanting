const generateToken = () => {
  console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
}
generateToken();