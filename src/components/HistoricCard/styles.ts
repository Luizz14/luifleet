import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;

  border: 3px;
  border-bottom-width: 6px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_500};

  margin-bottom: 12px;

  width: 100%;
  padding: 20px 16px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const Info = styled.View`
  flex: 1;
`

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-weight: 700;
`

export const Departure = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-weight: 500;

  margin-top: 4px;
`
