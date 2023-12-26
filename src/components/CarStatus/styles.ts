import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  padding: 22px;
  border: 4px;
  border-bottom-width: 8px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_600};

  border-radius: 16px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  align-items: center;
`

export const IconBox = styled.View`
  width: 77px;
  height: 77px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};

  margin-right: 12px;

  justify-content: center;
  align-items: center;
`

export const Message = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-weight: 500;

  flex: 1;
`

export const TextHighlight = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-weight: 700;
`
