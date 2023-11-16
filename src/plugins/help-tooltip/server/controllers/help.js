'use strict';

/**
 *  controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('plugin::help-tooltip.help');

module.exports = ({ strapi }) => {
  const helpService = strapi.plugin("help-tooltip").service("helpService");
  const findMany = async (ctx) => {
    try {
      const entities = await helpService.findMany(ctx.query);
      ctx.body = entities;
    }
    catch (exp) {
      throw exp;
    }
  };
  return { findMany };
};
