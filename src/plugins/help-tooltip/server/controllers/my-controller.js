'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('help-tooltip')
      .service('myService')
      .getWelcomeMessage();
  },
});
