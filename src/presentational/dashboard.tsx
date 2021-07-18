import { FlexContainer } from "../data/system/flex-container"
import { HeroTypography } from "../data/system/hero-typography"

interface DashboardProps {
  currentDay: number
}
export const Dashboard: React.FC<DashboardProps> = ({ currentDay }) => {
  return (
    <FlexContainer style={{alignItems: 'flex-start'}}>
      Day: <HeroTypography value={currentDay} />
    </FlexContainer>
  )
}