'use strict';

/**
 *  service
 */

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('plugin::help-tooltip.help');

module.exports = ({ strapi }) => {
  const query = strapi.db.query('plugin::help-tooltip.help');
  const findMany = async (params, populate) => {
    let helpEntities = undefined;
    try {
      helpEntities = query.findMany(params, populate);
    }
    catch (exp) {
      throw new Error(`Help Service: An error occured when get help: ${exp.message}`);
    }
    return helpEntities;
  }
  return {
    findMany
  }
}
