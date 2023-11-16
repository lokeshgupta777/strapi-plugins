import type { Schema, Attribute } from '@strapi/strapi';

export interface NewComponentUserComponent extends Schema.Component {
  collectionName: 'components_new_component_user_components';
  info: {
    displayName: 'User Component';
    description: '';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'new-component.user-component': NewComponentUserComponent;
    }
  }
}
