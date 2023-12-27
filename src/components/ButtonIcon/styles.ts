import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  display: inline;
  height: 56px;
  width: 56px;

  border: 3px;
  border-bottom-width: 6px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_500};

  border-radius: 8px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};

  /* :focus {
    border: 0px;
  } */
`
