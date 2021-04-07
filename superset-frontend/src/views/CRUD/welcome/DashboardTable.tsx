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
import React, { useEffect } from 'react';
import { t } from '@superset-ui/core';
import { useListViewResource } from 'src/views/CRUD/hooks';
import { Dashboard, DashboardTableProps } from 'src/views/CRUD/types';
import withToasts from 'src/messageToasts/enhancers/withToasts';
import DashboardCard from 'src/views/CRUD/dashboard/DashboardCard';
import EmptyState from './EmptyState';
import { CardContainer } from '../utils';
import Loading from 'src/components/Loading';

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
}: DashboardTableProps) {

  const {
    state: { loading, resourceCollection: dashboards },
    hasPerm,
    refreshData,
    fetchData,
  } = useListViewResource<Dashboard>(
    'dashboard',
    t('dashboard'),
    addDangerToast,
    true
  );


    const getFilters = (filterName?: string) => {
      const filters = [];
      if (filterName === 'Mine') {
        filters.push({
          id: 'owners',
          operator: 'rel_m_m',
          value: `${user?.userId}`,
        });
      }  else if (filterName === 'Favorite') {
        filters.push({
          id: 'id',
          operator: 'dashboard_is_favorite',
          value: true,
        });
      }
      return filters;
    };

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
