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
import React, { useState, useMemo, useEffect } from 'react';
import { SupersetClient, t } from '@superset-ui/core';
import { useListViewResource, useFavoriteStatus } from 'src/views/CRUD/hooks';
import {
  Dashboard,
  DashboardTableProps,
  TableTabTypes,
} from 'src/views/CRUD/types';

import { useHistory } from 'react-router-dom';
import {
  setInLocalStorage,
  getFromLocalStorage,
} from 'src/utils/localStorageHelpers';
import { createErrorHandler, CardContainer } from 'src/views/CRUD/utils';
import { HOMEPAGE_DASHBOARD_FILTER } from 'src/views/CRUD/storageKeys';

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

const PAGE_SIZE = 16;

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
  //const filterStore = getFromLocalStorage(HOMEPAGE_DASHBOARD_FILTER, null);
  //const defaultFilter = filterStore || TableTabTypes.MINE;

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

/*
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
*/
  const getData = (filter?: string) =>
    fetchData({
      pageIndex: 0,
      pageSize: PAGE_SIZE,
      sortBy: [
        {
          id: 'dashboard_title',
          desc: false,
        },
      ],
      //filters: getFilters(filter),
      filters:[]
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
              setDashboardFilter(TableTabTypes.FAVORITE);
              setInLocalStorage(
                HOMEPAGE_DASHBOARD_FILTER,
                TableTabTypes.FAVORITE,
              );
            },
          },
          {
            name: 'Mine',
            label: t('Mine'),
            onClick: () => {
              setDashboardFilter(TableTabTypes.MINE);
              setInLocalStorage(HOMEPAGE_DASHBOARD_FILTER, TableTabTypes.MINE);
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
              handleBulkDashboardExport={handleBulkDashboardExport}
            />
          ))}
        </CardContainer>
      )}
      {dashboards.length === 0 && (
        <EmptyState tableName="DASHBOARDS" tab={'Dashboards'} />
      )}
      {preparingExport && <Loading />}
    </>
  );*/
  return (
    <>
      
      {loading ? (
       preparingExport && <Loading position="inline" />
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
              showThumbnails={true}
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
