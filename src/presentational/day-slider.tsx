import { Slider } from "./slider";

interface DaySliderProps {
  handleChange: (day: number) => void;
  maxExpiryDay: number;
  currentDay: number;
}
export const DaySlider: React.FC<DaySliderProps> = ({
  handleChange,
  maxExpiryDay,
  currentDay,
}) => {
  return (
    <Slider
      max={maxExpiryDay}
      value={currentDay}
      onChange={handleChange}
      width={400}
    />
  );
};
