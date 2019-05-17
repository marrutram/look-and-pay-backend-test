import axios from 'axios';

class requestTest {
  private config;

  constructor() {
    this.config = 'https://mc2tgc5762z2r2nx5kqg1qnfbx8y.auth.marketingcloudapis.com';
  }

  async getToken () {
    return await axios({
      method: 'post',
      url: `${this.config}/v2/token`,
      data: {}
    });
  }


}

export default requestTest