import React, { useRef, useEffect, useState } from 'react';
//Translation
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
//Proxy
import SettingsProxy from '../../api/settings-proxy';
//Design-System components
import { Flex, Main, ContentLayout, Box, Typography, Button, HeaderLayout, Grid, GridItem, ToggleInput } from '@strapi/design-system';
import { Check } from '@strapi/icons';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';
import { version as packageVersion } from '../../../../package.json';

const Settings = () => {
  const { formatMessage } = useIntl();
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({});
  const toggleNotification = useNotification();

  useEffect(() => {
    SettingsProxy.get().then((data) => {
      // @ts-ignore
      setSettings(data);
      setIsLoading(false);
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    const data = await SettingsProxy.set(settings);
    // @ts-ignore
    setSettings(data);
    setIsSaving(false);
    toggleNotification({
      type: 'success',
      message: { id: getTrad("plugin.settings.button.save.message") },
    });
  };

  return (
    <>
      <Main labelledBy="title" aria-busy={isLoading}>
        <HeaderLayout
          id="title"
          title={formatMessage({ id: getTrad("plugin.settings.title") })}
          subtitle={formatMessage({ id: getTrad("plugin.settings.version") }, { version: packageVersion })}
          primaryAction={
            isLoading ? <></> :
              <Button onClick={handleSubmit} startIcon={<Check />} size="L" disabled={isSaving} loading={isSaving}>
                {formatMessage({ id: getTrad("plugin.settings.button.save.label") })}
              </Button>
          }
        >
        </HeaderLayout>
        {isLoading ? (<LoadingIndicatorPage />)
          : <ContentLayout>
            <form onSubmit={handleSubmit}>
              <Box
                background="neutral0"
                hasRadius
                shadow="filterShadow"
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={7}
                paddingRight={7}
              >
                <Flex size={3}>
                  <Typography variant='alpha'>
                    {formatMessage({
                      id: getTrad("plugin.settings.general.title")
                    })}
                  </Typography>
                  <Grid gap={6}>
                    <GridItem col={12} s={12}>
                      <ToggleInput
                        // @ts-ignore
                        checked={settings?.enabled ?? false}
                        hint={formatMessage({ id: getTrad("plugin.settings.enabled.descr") })}
                        label={formatMessage({ id: getTrad("plugin.settings.enabled") })}
                        name="moduleEnabled"
                        offLabel={formatMessage({
                          id: 'app.components.ToggleCheckbox.off-label',
                          defaultMessage: 'Off',
                        })}
                        onLabel={formatMessage({
                          id: 'app.components.ToggleCheckbox.on-label',
                          defaultMessage: 'On',
                        })}
                        onChange={(e) => {
                          // @ts-ignore
                          setSettings({
                            enabled: e.target.checked
                          });
                        }
                        }
                      />
                    </GridItem>
                  </Grid>
                </Flex>
              </Box>
            </form>
          </ContentLayout>
        }
      </Main>
    </>
  );
};

export default Settings;