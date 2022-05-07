type ValidationResult = {
  isValid: boolean;
  message: string | null;
}

class Validation {
  private _result: ValidationResult = {
    isValid: true,
    message: null,
  };

  constructor() { }

  get result() {
    return this._result;
  }

  public validateLogin(login: string) {
    this._generalValidate(login);
    if (this._result.isValid) {
      this._validateLength(login, 3, 20);
    }
  }

  public validatePassword(password: string) {
    this._generalValidate(password);
    if (this._result.isValid) {
      this._validateLength(password, 8, 40);
    }
  }

  public validateEmail(email: string) {
    this._generalValidate(email);
    if (this._result.isValid) {
      const isValid = email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      if (!isValid) {
        this._updateResult(false, "Email должен быть формата \"something@email.com\"");
      }
    }
  }

  public validateDisplayName(name: string | null) {
    if (!name) {
      this._updateResult(false, "Поле не может быть пустым");
    } else {
      this._validateLength(name, 3, 20);
    }
  }

  public validateName(name: string) {
    this._generalValidate(name);
    if (this._result.isValid) {
      const isValidFirstLetter = /^[A-Z|А-Я]/.test(name);
      const isInvalidLetters = /[^A-Za-z|А-Яа-я]+/g.test(name);
      if (!isValidFirstLetter) {
        this._updateResult(false, "Первой должна идти заглавная буква");
      }
      if (isInvalidLetters && isValidFirstLetter) {
        this._updateResult(false, "Должны быть только буквы");
      }
    }
  }

  public validatePhone(phone: string) {
    this._generalValidate(phone);
    if (this._result.isValid) {
      const isValid = /^([+]|\d)([0-9])+$/.test(phone);
      if (!isValid) {
        this._updateResult(false, "Должны быть только цифры");
      }
      if (this._result.isValid) {
        this._validateLength(phone, 10, 15);
      }
    }
  }

  private _generalValidate(field: string) {
    if (!field.length) {
      this._updateResult(false, "Поле не может быть пустым");
      return;
    }
    this._updateResult(true, null);
  }

  private _updateResult(isValid: boolean, message: string | null) {
    this._result.isValid = isValid;
    this._result.message = message;
  }

  private _validateLength(field: string, less: number, more: number) {
    if (field.length < less) {
      this._updateResult(false, `Количество символов должно быть больше ${less}`);
      return;
    }

    if (field.length > more) {
      this._updateResult(false, `Количество символов должно быть меньше ${more}`);
      return;
    }
    this._updateResult(true, null);
  }
}

export default Validation;