import React, { useEffect, useState } from "react";
import { ServiceResItem } from "../data/service";
import { FlexContainer } from "../data/system/flex-container";
import { useService } from "../hooks/use-service";
import { Dashboard } from "../presentational/dashboard";
import { DaySlider } from "../presentational/day-slider";
import { ItemTable } from "../presentational/table";




interface MainProps {}

export const Main: React.FC<MainProps> = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [maxExpiry, setMaxExpiry] = useState(0);
  const [items, setItems] = useState<ServiceResItem[]>()
  const service = useService();

  useEffect(() => {
    setMaxExpiry(service.getMaxExpiryDay());
    setItems(service.getAllForDay(currentDay).items)
  }, [service, currentDay]);

  return (
    <FlexContainer style={{width: 600, height: 325, flexDirection: 'column'}}>
      <FlexContainer style={{width: 600}}>
        <DaySlider handleChange={setCurrentDay} maxExpiryDay={maxExpiry} currentDay={currentDay} />
        <Dashboard currentDay={currentDay} />
      </FlexContainer>
      {items && <ItemTable items={items} currentDay={currentDay} />}
    </FlexContainer>
  )
};
