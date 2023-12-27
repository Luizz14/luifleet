import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Content = styled.View`
  flex: 1;

  margin: 32px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-weight: 700;

  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-weight: 500;

  margin-top: 32px;
  text-align: center;
`
