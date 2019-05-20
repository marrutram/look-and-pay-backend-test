import { unionBy, forOwn} from 'lodash';

class User {
  private _hello:string;

  constructor() {
    this.hello = 'Look and Pay';
  }

  get hello():string {
    return this._hello;
  }

  set hello(theHello:string) {
    this._hello = theHello;
  }
  registryImage(){
    return "hello";
  }
  updateParametersUser(dataInput, dataActual) {
    forOwn(dataInput, (value, key) => {
      if (key === 'users') {
        dataActual[key] = unionBy(value, dataActual[key], 'name');
      } else {
        dataActual[key] = value;
      }
    })
    return dataActual;
  }
}

export default User 