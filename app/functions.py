from cryptography.fernet import Fernet

class creditCardFunctions ():
  
    def encrypt_value( value):
        #encrypts a value
        
        key = open("secret.key", "rb").read()
        encodedValue = value.encode()
        f = Fernet(key)
        encryptedValue = f.encrypt(encodedValue)

        return encryptedValue.decode("utf-8") 

    def decrypt_value(value):
        #decrypts a value
        
        key = open("secret.key", "rb").read()
        f = Fernet(key)
        decryptedMessage = f.decrypt(value)
        decode = decryptedMessage.decode()

        #return only the last 4 characters
        finalValue = "************" + decode[-4:]
        
        return finalValue