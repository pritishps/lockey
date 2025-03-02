function encryptPassword(password, secretKey) {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }
  
  // Decryption function
function decryptPassword(encryptedPassword, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }