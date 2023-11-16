'use strict';

/**
 *  router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('plugin::help-tooltip.help');

module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'GET',
      path: '/helps',
      handler: 'helpController.findMany',
      config: {
        policies: [],
      },
    },
  ]
}
