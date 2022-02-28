type FormFields = {
  login?: string,
  password?: string,
  email?: string,
  name?: string,
  lastName?: string,
  phone?: string,
}

type Field = {
  error: boolean,
  errorMessage: string,
  value: string,
  type: string
}
type Form = Array<Field>

class Validation {
  form: Form = [];

  constructor(formFields: FormFields) {
    Object.entries(formFields).forEach(([key, value]) => {
      this.form.push({
        error: false,
        errorMessage: "",
        value,
        type: key,
      });
    });
    this._validate(this.form);
  }

  public updateFields(type: string, value: string) {
    this.form.forEach((field) => {
      if (field.type === type) {
        field.value = value;
      }
    });
    this._validate(this.form);
  }

  get getForm() {
    return this.form;
  }

  private _validate(form: Form) {
    form.forEach((field) => {
      if (!field.value) {
        field.error = true;
        field.errorMessage = "Поле не может быть пустым";
      } else {
        field.error = false;
        field.errorMessage = "";
        if (field.type === "login") {
          this._validateLength(field, 3, 20);
        }
        if (field.type === "password") {
          this._validateLength(field, 8, 40);
        }
        if (field.type === "mail") {
          this._validateMail(field);
        }
        if (field.type === "name" || field.type === "lastName") {
          this._validateName(field);
        }
        if (field.type === "phone") {
          this._validatePhone(field);
          this._validateLength(field, 10, 15);
        }
      }
    });
  }

  private _validateLength(field: Field, less: number, more: number) {
    if (field.value.length < less) {
      field.error = true;
      field.errorMessage = "Количество символов должно быть больше";
    } else if (field.value.length > more) {
      field.error = true;
      field.errorMessage = "Количество символов должно быть меньше";
    }
  }

  private _validateMail(field: Field) {
    const isValid = field.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (!isValid) {
      field.error = true;
      field.errorMessage = "Email должен быть формата \"something@email.com\"";
    }
  }

  private _validateName(field: Field) {
    const isValidFirstLetter = /^[A-Z|А-Я]/.test(field.value);
    const isInvalidLetters = /[^A-Za-z|А-Яа-я]+/g.test(field.value);
    if (!isValidFirstLetter) {
      field.error = true;
      field.errorMessage = "Первой должна идти заглавная буква";
    }
    if (isInvalidLetters && isValidFirstLetter) {
      field.error = true;
      field.errorMessage = "Должны быть только буквы";
    }
  }

  private _validatePhone(field: Field) {
    const isValid = /^([+]|\d)([0-9])+$/.test(field.value);
    if (!isValid) {
      field.error = true;
      field.errorMessage = "Должны быть только цифры";
    }
  }

  public clearError() {
    this.form.forEach((item) => {
      item.error = false;
      item.errorMessage = "";
    });
  }
}

export default Validation;