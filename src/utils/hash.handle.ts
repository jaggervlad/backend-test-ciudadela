import bcrypt from 'bcrypt';

export const compareHashedString = async (plainText: string, text: string) => {
  try {
    return await bcrypt.compare(plainText, text);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const hashString = async (val: string) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(val, salt);

    return hash;
  } catch (error) {
    console.error(error);

    return false;
  }
};
