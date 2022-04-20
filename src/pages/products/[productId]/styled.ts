import styled from 'styled-components';
import { COLOR } from '../../../shared/constants';

export const Container = styled.main`
  width: 128rem;
  padding-top: 12rem;
  margin: 0 auto;
`;

export const ProductHeader = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14rem;
`;

export const ProductImage = styled.div`
  width: 60rem;
  height: 60rem;
`;

export const ProductSummary = styled.div`
  width: 63rem;
  height: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 400;
  margin-bottom: 1.7rem;
`;

export const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
`;

export const OriginalPrice = styled.span`
  font-size: 1.8rem;
  color: ${COLOR.greyC4};
  text-decoration: line-through;
  margin-left: 1rem;
`;

export const DiscountRate = styled.span`
  font-size: 3.6rem;
  font-weight: 700;
  color: ${COLOR.accentColor};
  margin-left: 1rem;
`;

export const FinalPrice = styled.span`
  font-size: 3.6rem;
  font-weight: 700;
`;
export const Shipment = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${COLOR.grey76};
  margin-bottom: 1.8rem;
`;

export const ProductBody = styled.section``;

export const TabSection = styled.section`
  min-height: 100rem;
  position: relative;
  padding-top: 16rem;
  margin-bottom: 8rem;
`;

export const TabMenu = styled.section`
  position: sticky;
  top: 0;
  z-index: 10;
`;
