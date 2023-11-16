import React, { useEffect, useState } from 'react';
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
// Strapi UI system
import { IconButton, Table, Thead, Tbody, Tr, Td, Th, Typography } from "@strapi/design-system";
import { Pencil } from "@strapi/icons";
import { ModalForm } from "../ModalForm";
import {
  useNotification,
} from '@strapi/helper-plugin';
import settingsProxy from '../../api/settings-proxy';

export const HelpTable = ({ data }) => {
  const { formatMessage } = useIntl();
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const toggleNotification = useNotification();
  const [showHelp, setShowHelp] = useState("");

  const getShowHelp = () => {
    // @ts-ignore
    settingsProxy.get().then((data) => { setShowHelp(data?.enabled ?? false) })
  }

  useEffect(() => {
    getShowHelp()
  }, []);

  const handleToggle = () => {
    setIsModalOpen(prev => !prev);
  }

  const handleSave = (result) => {
    let helpItems = data.filter(item => item.id === result.id);
    if (helpItems && helpItems.length > 0) {
      helpItems[0].help = result.help;
      toggleNotification({
        type: 'success',
        message: { id: getTrad("plugin.help.table.edit.save.message") },
      });
    }
    else {
      toggleNotification({
        type: 'warning',
        message: { id: getTrad("plugin.help.table.edit.save.error") },
      });
    }
  }

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsModalOpen(prev => !prev);
  };

  return (
    <>
      {data && data.length > 0 ?
        <>
          {isModalOpened && <ModalForm onToggle={handleToggle} onSave={handleSave} help={selectedRow} />}
          <Table colCount={4} rowCount={data.length} footer={null}>
            <Thead>
              <Tr>
                <Th action={() => { }}>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad("plugin.help.table.contentType") })}
                  </Typography>
                </Th>
                <Th action={() => { }}>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad("plugin.help.table.fieldName") })}
                  </Typography>
                </Th>
                <Th action={() => { }}>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad("plugin.help.table.help") })}
                  </Typography>
                </Th>
                <Th action={() => { }}>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => {
                return (
                  <Tr key={`contentpage-${index}`}>
                    <Td>
                      <Typography
                        textColor="neutral800"
                        fontWeight="inherited"
                      >
                        {item.contentType}
                      </Typography>
                    </Td>
                    <Td style={{ whiteSpace: "break-spaces" }}>
                      <Typography
                        textColor="neutral800"
                        fontWeight="inherited"
                      >
                        {item.fieldName}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography
                        textColor="neutral800"
                        fontWeight="inherited"
                      >
                        {showHelp ? item.help : ""}
                      </Typography>
                    </Td>
                    <Td>
                      <IconButton
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit({ ...item });
                        }}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </> :
        <Typography variant="omega" fontWeight="semiBold">
          {formatMessage({ id: getTrad("plugin.help.table.nodata") })}
        </Typography>
      }
    </>
  );
};

HelpTable.defaultProps = {
  data: [],
};