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
import React from 'react';
import { styled } from '@superset-ui/core';
import withToasts from 'src/messageToasts/enhancers/withToasts';


const SubheaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.light4};
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(245, 246, 252, 0.1), rgba(245, 246, 252, 0.2) 85%, rgba(252,98,32,1) 100%), url(/static/assets/images/gto_landscape.jpg);
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat-x: no-repeat;
  position: absolute;
  width: 100%;
  top: 0;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors.grayscale.light5};
  font-size: 50px;
  font-weight: bold;
  position: absolute;
  left: 30px;
  top: 70px;
`;

function Subheader() {
  return (
    <SubheaderContainer>
      <Title>Dashboards</Title>
    </SubheaderContainer>
  );
}

export default withToasts(Subheader);
