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
  background-color: ${({ theme }) => theme.colors.secondary.dark3};
  background-image: url(/static/assets/images/gto_landscape.jpg);
  height: 65vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  top: 0;
`;

const TextContainer = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.light5};
  position: absolute;
  max-width: min(90%, 550px);
  top: 150px;
  left: 15%;
  font-family: tahoma;
  margin: 0 10px;
  text-shadow: 0.5px 0 0 #000, 0 -0.5px 0 #000, 0 0.5px 0 #000, -0.5px 0 0 #000;
`;

const Title = styled.label`
  font-size: 50px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 15px;
  margin: 50px 0 10px 0;
  font-weight: 500;
`;

function Subheader() {
  return (
    <SubheaderContainer>
      <TextContainer>
        <Title>Datos Guanajuato</Title>
        <Subtitle>
          Datos Guanajuato integra fuentes de información para conocer mejor el estado y sus municipios.
          Permite visualizar interactivamente, descargar información y generar reportes que cuentan historias en datos.
        </Subtitle>
      </TextContainer>
    </SubheaderContainer>
  );
}

export default withToasts(Subheader);
