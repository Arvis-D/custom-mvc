export default class Ajax {
  private data: FormData = null;
  private url: string = '';
  private method: string = 'POST';
  private submitByForm: boolean = false;
  private formToSubmit: HTMLFormElement = null;

  public send() {
    if (this.submitByForm) {
      return this.submitForm();
    } else {
      return fetch(this.url, {
        method: this.method,
        credentials: 'same-origin',
        body: this.data
      });
    }
  }
  
  public add(key: string, value: string): Ajax {
    this.data = this.data || new FormData;
    this.data.append(key, value);

    return this;
  }

  public setUrl(url: string): Ajax {
    this.url = url;

    return this;
  }

  public form(form: HTMLFormElement): Ajax {
    this.data = new FormData(form);
    this.submitByForm = true;
    this.formToSubmit = form;

    return this;
  }

  public methodGet(): Ajax {
    this.method = 'GET';

    return this;
  }

  public methodPost(): Ajax {
    this.method = 'POST';

    return this;
  }

  private submitForm() {
    return fetch(this.formToSubmit.getAttribute('action'), {
      body: this.data,
      method: this.formToSubmit.getAttribute('method'),
      credentials: 'same-origin'
    })
  }

  public static create(): Ajax {
    return new Ajax();
  }
}