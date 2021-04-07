/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
import React, { useState, useMemo } from 'react';
import { SupersetClient, t } from '@superset-ui/core';
import { useListViewResource, useFavoriteStatus } from 'src/views/CRUD/hooks';
import { Dashboard, DashboardTableProps } from 'src/views/CRUD/types';
import { useHistory } from 'react-router-dom';
import withToasts from 'src/messageToasts/enhancers/withToasts';
import Loading from 'src/components/Loading';
import PropertiesModal from 'src/dashboard/components/PropertiesModal';
import DashboardCard from 'src/views/CRUD/dashboard/DashboardCard';
import SubMenu from 'src/components/Menu/SubMenu';
import EmptyState from './EmptyState';
*/

import React, { useState, useEffect } from 'react';
import { t } from '@superset-ui/core';
import { useListViewResource } from 'src/views/CRUD/hooks';
import { Dashboard, DashboardTableProps } from 'src/views/CRUD/types';
import withToasts from 'src/messageToasts/enhancers/withToasts';
import DashboardCard from 'src/views/CRUD/dashboard/DashboardCard';
import EmptyState from './EmptyState';
import { CardContainer } from '../utils';
import Loading from 'src/components/Loading';
import handleResourceExport from 'src/utils/export';

const PAGE_SIZE = 15;

export interface FilterValue {
  col: string;
  operator: string;
  value: string | boolean | number | null | undefined;
}

function DashboardTable({
  user,
  addDangerToast,
  addSuccessToast,
  //mine,
  showThumbnails,
}: DashboardTableProps) {
  //const history = useHistory();
  const {
    state: { loading, resourceCollection: dashboards },
    hasPerm,
    refreshData,
    fetchData,
  } = useListViewResource<Dashboard>(
    'dashboard',
    t('dashboard'),
    addDangerToast,
    true,
    //defaultFilter === 'Favorite' ? [] : mine,
    [],
    //false,
  );
  
  /*
  const dashboardIds = useMemo(() => dashboards.map(c => c.id), [dashboards]);
  const [saveFavoriteStatus, favoriteStatus] = useFavoriteStatus(
    'dashboard',
    dashboardIds,
    addDangerToast,
  );
  const [editModal, setEditModal] = useState<Dashboard>();
  const [dashboardFilter, setDashboardFilter] = useState(defaultFilter);
  const [preparingExport, setPreparingExport] = useState<boolean>(false);

  useEffect(() => {
    getData(dashboardFilter);
  }, [dashboardFilter]);
*/
  const [ preparingExport, setPreparingExport] = useState<boolean>(false);
  const handleBulkDashboardExport = (dashboardsToExport: Dashboard[]) => {
    const ids = dashboardsToExport.map(({ id }) => id);
    handleResourceExport('dashboard', ids, () => {
      setPreparingExport(false);
    });
    setPreparingExport(true);
  };


  const getFilters = (filterName?: string) => {
    const filters = [];
    if (filterName === 'Mine') {
      filters.push({
        id: 'owners',
        operator: 'rel_m_m',
        value: `${user?.userId}`,
      });
    } else {
      filters.push({
        id: 'id',
        operator: 'dashboard_is_favorite',
        value: true,
      });
    }
    return filters;
  };
  const subMenus = [];
  if (dashboards.length > 0 && dashboardFilter === 'favorite') {
    subMenus.push({
      name: 'Favorite',
      label: t('Favorite'),
      onClick: () => setDashboardFilter('Favorite'),
    });
  }

  const getData = (filter?: string) =>
    fetchData({
      pageIndex: 0,
      pageSize: PAGE_SIZE,
      sortBy: [
        {
          id: 'changed_on_delta_humanized',
          desc: true,
        },
      ],
      filters: getFilters(filter),
    });
  console.log('DASHHH', dashboards);


  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading position="inline" />;
  /*return (
    <>
      <SubMenu
        activeChild={dashboardFilter}
        tabs={[
          {
            name: 'Favorite',
            label: t('Favorite'),
            onClick: () => {
              getData('Favorite').then(() => setDashboardFilter('Favorite'));
            },
          },
          {
            name: 'Mine',
            label: t('Mine'),
            onClick: () => {
              getData('Mine').then(() => setDashboardFilter('Mine'));
            },
          },
        ]}
        buttons={[
          {
            name: (
              <>
                <i className="fa fa-plus" />
                Dashboard
              </>
            ),
            buttonStyle: 'tertiary',
            onClick: () => {
              window.location.assign('/dashboard/new');
            },
          },
          {
            name: 'View All »',
            buttonStyle: 'link',
            onClick: () => {
              const target =
                dashboardFilter === 'Favorite'
                  ? '/dashboard/list/?filters=(favorite:!t)'
                  : '/dashboard/list/';
              history.push(target);
            },
          },
        ]}
      />
      {editModal && (
        <PropertiesModal
          dashboardId={editModal?.id}
          show
          onHide={() => setEditModal(undefined)}
          onSubmit={handleDashboardEdit}
        />
      )}
      {dashboards.length > 0 && (
        <CardContainer>
          {dashboards.map(e => (
            <DashboardCard
              key={e.id}
              dashboard={e}
              hasPerm={hasPerm}
              bulkSelectEnabled={false}
              showThumbnails={showThumbnails}
              dashboardFilter={dashboardFilter}
              refreshData={refreshData}
              addDangerToast={addDangerToast}
              addSuccessToast={addSuccessToast}
              userId={user?.userId}
              loading={loading}
              openDashboardEditModal={(dashboard: Dashboard) =>
                setEditModal(dashboard)
              }
              saveFavoriteStatus={saveFavoriteStatus}
              favoriteStatus={favoriteStatus[e.id]}
            />
          ))}
        </CardContainer>
      )}
      {dashboards.length === 0 && (
        <EmptyState tableName="DASHBOARDS" tab={'Dashboards'} />
      )}
    </>
  );*/
  return (
    <>
      
      {loading ? (
        <Loading position="inline" />
      ) : (
        <>
          {dashboards.length > 0 && (
        <CardContainer>
          {dashboards.map(e => (
            <DashboardCard
              key={e.id}
              dashboard={e}
              hasPerm={hasPerm}
              bulkSelectEnabled={false}
              refreshData={refreshData}
              addDangerToast={addDangerToast}
              addSuccessToast={addSuccessToast}
              userId={user?.userId}
              loading={loading}
              openDashboardEditModal={() => {}}
              saveFavoriteStatus={(id: number, isStarred: boolean) => {}}
              favoriteStatus={false}
              handleBulkDashboardExport={handleBulkDashboardExport}
              coverLeft={false}
              actions={false}
            />
          ))}
        </CardContainer>
      )}
      {dashboards.length === 0 && (
        <EmptyState tableName="DASHBOARDS" tab={'Dashboards'} />
      )}
        </>     
      )}

    </>
  );
}

export default withToasts(DashboardTable);
