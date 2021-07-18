import styled from "styled-components"

const StyledHeroTypography = styled.div`
  font-size: 5em;
  color: ${props => props.theme.colors.highlightt}
`

interface HeroTypographyProps {
  value: string | number
}
export const HeroTypography: React.FC<HeroTypographyProps> = ({ value }) => {
  return (
    <StyledHeroTypography>{`${value}`}</StyledHeroTypography>
  )
}