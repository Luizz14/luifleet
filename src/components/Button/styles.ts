import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;

  border-radius: 8px;
  align-items: center;
  justify-content: center;

  border: 3px;
  border-bottom-width: 6px;
  border-color: ${({ theme }) => theme.COLORS.BRAND_MID};

  background-color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-weight: 700;
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``
