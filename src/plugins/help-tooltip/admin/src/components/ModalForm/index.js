import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
import {
  ModalLayout,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Breadcrumbs,
  Crumb,
  Box,
  Button,
  Stack,
  Typography,
  TextInput,
  Flex
} from '@strapi/design-system/';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';

export const ModalForm = ({ help, onToggle, onSave }) => {
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [innerHelp, setInnerHelp] = useState(undefined);

  useEffect(() => {
    setInnerHelp(help);
    setIsLoading(false);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    onSave(innerHelp);
    setIsSaving(false);
    onToggle();
  };

  const textInputProps = {
    placeholder: formatMessage({
      id: getTrad('plugin.help.modal.content.placeholder'),
      defaultMessage: 'Contextual help details',
    }),
    label: formatMessage({
      id: getTrad('plugin.help.modal.content.label'),
      defaultMessage: 'Contextual help details',
    }),
    name: "content",
    hint: formatMessage({
      id: getTrad('plugin.help.modal.content.hint'),
      defaultMessage: 'Contextual help details',
    }),
    value: innerHelp?.help || "",
    onChange: (e) => {
      setInnerHelp({ ...innerHelp, help: e.target.value });
    }
  }

  return (
    <ModalLayout onClose={onToggle} labelledBy="title">
      <ModalHeader>
        <Breadcrumbs label={"Header Title"}>
          <Crumb>
            {formatMessage({
              id: getTrad('plugin.help.modal.title'),
              defaultMessage: 'Help Edit',
            })
            }
          </Crumb>
        </Breadcrumbs>
      </ModalHeader>
      {isLoading ? (<LoadingIndicatorPage />)
        :
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Flex>
              <Box>
                <Typography variant="beta" as="h2">
                  {formatMessage({
                    id: getTrad('plugin.help.modal.details'),
                    defaultMessage: 'Contextual help details',
                  })
                  }
                </Typography>
                <Box paddingTop={4}>
                  <Flex size={1}>
                    {/* @ts-ignore */}
                    <TextInput {...textInputProps} />
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button variant="tertiary" onClick={onToggle} type="button">
                {formatMessage({
                  id: 'app.components.Button.cancel',
                  defaultMessage: 'Cancel',
                })}
              </Button>
            }
            endActions={
              <Button type="submit" loading={isSaving}>
                Save
              </Button>
            }
          />
        </form>
      }
    </ModalLayout>
  );
};

ModalForm.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  help: PropTypes.object.isRequired,
};