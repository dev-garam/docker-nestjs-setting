const crypto = require('crypto');

export const hash = (text: string, secret: string) =>
  crypto.createHmac('sha256', secret).update(text).digest('hex');
