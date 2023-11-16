import { request } from '@strapi/helper-plugin';

const settingsProxy = {
  get: async () => {
    const data = await request(`/help-tooltip/settings`, {
      method: 'GET'
    });
    return data;
  },
  set: async (data) => {
    return await request(`/help-tooltip/settings`, {
      method: 'POST',
      body: data
    });
  }
}
export default settingsProxy;