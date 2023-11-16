import React, { memo, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import pluginId from "../../pluginId";
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
//Some components
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
//Layout
import { ContentLayout, HeaderLayout, Layout, Main, Button, IconButton, Table, Thead, Tbody, Tr, Td, Th, Typography } from '@strapi/design-system';
import { Play, Cog, Pencil } from "@strapi/icons";

import { HelpTable } from '../../components/HelpTable';

const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [results, setResults] = useState([]);
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  const handleSubmit = async () => {
    setIsAnalysisRunning(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsAnalysisRunning(false);
      setIsLoading(false);
      setResults([{
        id: 1,
        contentType: "Article",
        fieldName: "name",
        help: "Enter Article Name"
      },
      {
        id: 2,
        contentType: "Article",
        fieldName: "description",
        help: "Enter Article Desc"
      },
      {
        id: 3,
        contentType: "Restaurant",
        fieldName: "name",
        help: "Enter Resturant Name"
      },
      {
        id: 4,
        contentType: "Restaurant",
        fieldName: "description",
        help: "Enter Resturant Desc"
      }]);
    }, 1000);
  };
  const configure = () => {
    push(`/settings/${pluginId}/`);
  };
  // const handleEdit = (a) => { }

  return <Main labelledBy="title" aria-busy={isLoading}>
    <HeaderLayout
      id="title"
      title={formatMessage({ id: getTrad("plugin.homepage.title") })}
      subtitle={formatMessage({ id: getTrad("plugin.homepage.subtitle") })}
      primaryAction={
        <Button
          onClick={handleSubmit}
          startIcon={<Play />}
          size="L"
          disabled={isLoading || isAnalysisRunning}
          loading={isAnalysisRunning}
        >
          {formatMessage({
            id: getTrad(
              isAnalysisRunning
                ? "plugin.help.analysisPending"
                : "plugin.help.runAnalysis"
            ),
          })}
        </Button>
      }
      secondaryAction={
        <Button variant="tertiary" onClick={configure} startIcon={<Cog />}>
          {formatMessage({ id: getTrad("plugin.help.settings") })}
        </Button>
      }
    >
    </HeaderLayout>
    <ContentLayout>
      {isLoading ? (
        <LoadingIndicatorPage />
      ) : (
        <Layout sideNav={null}>
          <HelpTable data={results} />
        </Layout>
      )}
    </ContentLayout>
  </Main>
};

export default memo(HomePage);